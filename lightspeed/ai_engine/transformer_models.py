import os
import logging
import random
from typing import List, Dict, Any

# Attempt to load actual hugging face transformers, but gracefully fallback to mock 
# for local environments without GPU/VRAM or network access to download weights.
try:
    from transformers import pipeline
    TRANSFORMERS_AVAILABLE = True
except ImportError:
    TRANSFORMERS_AVAILABLE = False
    logging.warning("Transformers library not found. Running in mock mode.")

class AIEngine:
    def __init__(self, use_mock_override=False):
        self.use_mock = use_mock_override or not TRANSFORMERS_AVAILABLE
        self.ner_pipeline = None
        self.summarize_pipeline = None
        
        if not self.use_mock:
            logging.info("Initializing Hugging Face models... This may take a moment.")
            try:
                # Using smaller distilled models for performance
                self.ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
                self.summarize_pipeline = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
            except Exception as e:
                logging.error(f"Failed to load models from Hugging Face hub: {e}. Falling back to mock.")
                self.use_mock = True

    def redact_pii(self, text: str) -> Dict[str, Any]:
        """
        Scans text for Named Entities (like persons, organizations, locations) and redacts them.
        """
        if self.use_mock:
            # Mock NER
            mock_entities = ["password", "token", "ssn", "secret", "key"]
            redacted_text = text
            found_entities = []
            for ent in mock_entities:
                if ent in text.lower():
                    # Dumb replacement for mock
                    redacted_text = redacted_text.replace(ent, "[REDACTED]")
                    found_entities.append({"entity_group": "SENSITIVE", "word": ent})
            
            return {
                "original_text": text,
                "redacted_text": redacted_text,
                "entities": found_entities
            }
            
        else:
            # Actual Hugging Face Inference
            entities = self.ner_pipeline(text)
            
            # Simple replacement logic (in prod, use character offsets for precision)
            redacted_text = text
            for ent in entities:
                # We redact PER, ORG, LOC for demo purposes
                if ent['entity_group'] in ['PER', 'ORG', 'LOC']:
                    redacted_text = redacted_text.replace(ent['word'], "[REDACTED]")
                    
            return {
                "original_text": text,
                "redacted_text": redacted_text,
                "entities": entities
            }

    def generate_rca(self, error_logs: str) -> str:
        """
        Takes raw error logs and generates a human-readable Root Cause Analysis summary.
        """
        if self.use_mock:
            return f"AI RCA Analysis: The system encountered a crash likely related to authentication or database connection timeouts. Ensure that backend services are reachable. (Confidence: {random.uniform(0.7, 0.99):.2f})"
        else:
            # Actual Hugging Face Inference
            # Summarization models require text bounds
            input_text = "Summarize this error log into a root cause: " + error_logs[:1024]
            summary = self.summarize_pipeline(input_text, max_length=50, min_length=10, do_sample=False)
            return summary[0]['summary_text']
            
    def analyze_ui_regression(self, image_path: str) -> Dict[str, Any]:
        """
        Simulates a Vision Transformer (ViT) inspecting an application screenshot for UI bugs.
        """
        # We explicitly mock this as agreed in the Implementation Plan.
        success = random.choice([True, True, True, False])
        return {
            "status": "pass" if success else "fail",
            "confidence": random.uniform(0.85, 0.99),
            "insights": "UI elements align with expected baseline." if success else "Detected anomaly: CSS layout shift on primary CTA button."
        }
