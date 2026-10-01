import os
try:
    from skillopt import SkillTrainer
except ImportError:
    print("SkillOpt is not installed. Please run: source .agent_tools_venv/bin/activate && pip install git+https://github.com/microsoft/SkillOpt.git")
    exit(1)

def main():
    print("🧠 Initializing SkillOpt Framework for SentAIent...")
    
    # Example template for defining an optimization task
    trainer = SkillTrainer(
        workspace_dir="./",
        tasks=[
            {
                "name": "React-Three-Fiber Optimization",
                "description": "Learn to perfectly construct continuous scrolling 3D worlds without clipping artifacts.",
                "validation_command": "npm run test:3d"
            },
            {
                "name": "Tailwind UI Consistency",
                "description": "Enforce the 'SentAIent' design system (dark mode, glassmorphism, glowing accents) on all generated components.",
                "validation_command": "npm run lint:css"
            }
        ],
        epochs=5,
        model_name="claude-3-5-sonnet-20241022"
    )
    
    print("✅ SkillOpt configured! Ready to start training loop.")
    # uncomment to run:
    # trainer.train()

if __name__ == "__main__":
    main()
