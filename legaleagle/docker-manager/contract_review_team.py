import sys
import json
import asyncio
import google.generativeai as genai

async def run_agent(model, role, prompt, contract_text):
    full_prompt = f"{prompt}\n\nCONTRACT TEXT:\n{contract_text}"
    loop = asyncio.get_running_loop()
    response = await loop.run_in_executor(None, lambda: model.generate_content(full_prompt))
    return response.text

async def review_contract(contract_text, api_key, prompts):
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        financial_prompt = prompts.get("financial_prompt", "Focus ONLY on financial liabilities.")
        legal_prompt = prompts.get("legal_prompt", "Focus ONLY on legal indemnification.")
        ip_prompt = prompts.get("ip_prompt", "Focus ONLY on IP rights.")
        synthesizer_template = prompts.get("synthesizer_prompt", "Synthesize these three reports.")

        # Run the 3 specialized agents concurrently
        financial_task = run_agent(model, "Financial Risk Analyst", financial_prompt, contract_text)
        legal_task = run_agent(model, "Lead Legal Counsel", legal_prompt, contract_text)
        ip_task = run_agent(model, "Intellectual Property Specialist", ip_prompt, contract_text)

        financial_report, legal_report, ip_report = await asyncio.gather(financial_task, legal_task, ip_task)

        # The Synthesizer Agent
        synthesizer_prompt = f"{synthesizer_template}\n\nFINANCIAL REPORT:\n{financial_report}\n\nLEGAL REPORT:\n{legal_report}\n\nIP REPORT:\n{ip_report}"
        
        loop = asyncio.get_running_loop()
        final_response = await loop.run_in_executor(None, lambda: model.generate_content(synthesizer_prompt))

        return {
            "success": True,
            "report": final_response.text,
            "raw_reports": {
                "financial": financial_report,
                "legal": legal_report,
                "ip": ip_report
            }
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        contract_text = input_data.get('contract_text')
        api_key = input_data.get('api_key')
        prompts = input_data.get('prompts', {})
        
        if not contract_text or not api_key:
            print(json.dumps({"success": False, "error": "Missing contract_text or api_key in stdin."}))
            sys.exit(1)
            
        # Run the async loop
        result = asyncio.run(review_contract(contract_text, api_key, prompts))
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)
