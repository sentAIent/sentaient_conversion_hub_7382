import sys
import json
import os
import google.generativeai as genai

def main():
    try:
        # Read JSON from stdin
        input_data = sys.stdin.read()
        if not input_data:
            print(json.dumps({"error": "No input provided"}))
            return

        request = json.loads(input_data)
        
        # Extract fields
        task_type = request.get('task_type', 'unknown')
        original_input = request.get('input_data', '')
        generated_output = request.get('generated_output', '')
        prompt = request.get('prompt', '')
        api_key = request.get('api_key', os.environ.get('VITE_GEMINI_API_KEY'))

        if not api_key:
            print(json.dumps({"error": "API key not found"}))
            return

        genai.configure(api_key=api_key)
        
        # Use gemini-1.5-pro or flash depending on available models, using 1.5-pro for better reasoning
        model = genai.GenerativeModel('gemini-1.5-pro')

        full_prompt = f"""
{prompt}

TASK TYPE:
{task_type}

ORIGINAL USER INPUT:
{original_input}

AI GENERATED OUTPUT TO EVALUATE:
{generated_output}

You must respond ONLY with a valid JSON object matching this exact schema, with no markdown formatting:
{{
  "confidence_score": <number between 0-100>,
  "hallucinations": [
     "Describe false or hallucinatory claim 1",
     "Describe false or hallucinatory claim 2"
  ],
  "verification_notes": "Your detailed critique of the accuracy, missing context, and caselaw relevance."
}}
"""

        response = model.generate_content(
            full_prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
            )
        )
        
        try:
            result = json.loads(response.text)
            print(json.dumps(result))
        except json.JSONDecodeError:
            # Fallback if somehow not valid JSON
            print(json.dumps({
                "error": "Evaluator failed to return valid JSON", 
                "raw": response.text
            }))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
