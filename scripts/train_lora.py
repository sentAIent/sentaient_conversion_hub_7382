"""
Sentaient Local Fine-Tuning Scaffolding
Uses Unsloth to rapidly train a LoRA adapter for Qwen2.5-Coder or Llama3 based on user telemetry.
"""
import os
import argparse

# In a real environment, you must pip install unsloth
try:
    from unsloth import FastLanguageModel
    import torch
    from trl import SFTTrainer
    from transformers import TrainingArguments
    from datasets import load_dataset
except ImportError:
    print("WARNING: Unsloth, torch, or trl not installed. Running in mock mode.")
    FastLanguageModel = None

def train_lora(dataset_path, model_name="unsloth/Qwen2.5-Coder-7B", output_dir="lora_adapters"):
    print(f"[Sentaient Trainer] Initializing LoRA fine-tuning for {model_name}...")
    
    if not FastLanguageModel:
        print("[Sentaient Trainer] MOCK MODE: Would have loaded model and started training.")
        print(f"Dataset: {dataset_path}")
        return

    # 1. Load Model with Unsloth for 2x faster inference/training
    max_seq_length = 2048
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = model_name,
        max_seq_length = max_seq_length,
        dtype = None, # Auto detection
        load_in_4bit = True, # 4bit quantization
    )

    # 2. Add LoRA adapters
    model = FastLanguageModel.get_peft_model(
        model,
        r = 16, # Choose any number > 0 ! Suggested 8, 16, 32, 64, 128
        target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                          "gate_proj", "up_proj", "down_proj",],
        lora_alpha = 16,
        lora_dropout = 0, 
        bias = "none",
        use_gradient_checkpointing = "unsloth", # 4x longer context windows
        random_state = 3407,
        use_rslora = False,
        loftq_config = None,
    )

    # 3. Load user telemetry dataset
    # Expected JSONL format: {"text": "User typed: ... Matrix responded: ..."}
    dataset = load_dataset("json", data_files=dataset_path, split="train")

    # 4. Train
    trainer = SFTTrainer(
        model = model,
        tokenizer = tokenizer,
        train_dataset = dataset,
        dataset_text_field = "text",
        max_seq_length = max_seq_length,
        dataset_num_proc = 2,
        packing = False, # Can make training 5x faster for short sequences.
        args = TrainingArguments(
            per_device_train_batch_size = 2,
            gradient_accumulation_steps = 4,
            warmup_steps = 5,
            max_steps = 60,
            learning_rate = 2e-4,
            fp16 = not torch.cuda.is_bf16_supported(),
            bf16 = torch.cuda.is_bf16_supported(),
            logging_steps = 1,
            optim = "adamw_8bit",
            weight_decay = 0.01,
            lr_scheduler_type = "linear",
            seed = 3407,
            output_dir = output_dir,
        ),
    )

    print("[Sentaient Trainer] Starting Unsloth training loop...")
    trainer_stats = trainer.train()
    
    print(f"[Sentaient Trainer] Training complete. Saving adapter to {output_dir}...")
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sentaient Unsloth LoRA Tuner")
    parser.add_argument("--dataset", type=str, default="scripts/mock_telemetry.jsonl", help="Path to telemetry JSONL")
    parser.add_argument("--model", type=str, default="unsloth/Qwen2.5-Coder-7B", help="Base model to tune")
    parser.add_argument("--output", type=str, default="lora_adapters/user_style_v1", help="Output directory")
    args = parser.parse_args()
    
    if not os.path.exists(args.dataset):
        print(f"Error: Dataset {args.dataset} not found.")
        exit(1)
        
    train_lora(args.dataset, args.model, args.output)
