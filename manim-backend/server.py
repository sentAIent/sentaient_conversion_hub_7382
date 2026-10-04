import os
import tempfile
import subprocess
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

app = FastAPI(title="Sentaient Manim Engine")

# Configure Gemini for dynamic code generation
GEMINI_KEY = os.getenv("VITE_GEMINI_API_KEY")
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)

class ManimPrompt(BaseModel):
    prompt: str

@app.post("/generate-manim")
async def generate_manim_video(req: ManimPrompt):
    """
    Accepts a natural language prompt (e.g. 'Explain Theta Waves'), 
    uses Gemini to generate Manim Python code, executes it, and returns the MP4.
    """
    if not GEMINI_KEY:
        raise HTTPException(status_code=500, detail="VITE_GEMINI_API_KEY not found in .env")

    # 1. Generate Manim Code via LLM
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        system_instruction = """
        You are an expert Manim developer. 
        Output ONLY valid Python code using the Manim library.
        Do not include markdown blocks or explanations.
        The class MUST be named 'GeneratedScene'.
        Create a beautiful, educational animation based on the user prompt.
        """
        response = model.generate_content(f"{system_instruction}\n\nUser Prompt: {req.prompt}")
        code = response.text.replace("```python", "").replace("```", "").strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM Error: {str(e)}")

    # 2. Execute Code
    with tempfile.TemporaryDirectory() as tmpdir:
        script_path = os.path.join(tmpdir, "scene.py")
        with open(script_path, "w") as f:
            f.write("from manim import *\n\n" + code)
        
        # Run Manim command: render at low quality (-ql) for speed during dynamic gen
        command = ["manim", "-ql", "--media_dir", tmpdir, script_path, "GeneratedScene"]
        
        try:
            subprocess.run(command, check=True, capture_output=True)
        except subprocess.CalledProcessError as e:
            raise HTTPException(status_code=500, detail=f"Manim Execution Failed: {e.stderr.decode()}")
        
        # 3. Locate and return the rendered video
        video_path = os.path.join(tmpdir, "videos", "scene", "480p15", "GeneratedScene.mp4")
        if os.path.exists(video_path):
            # In a real production app, we'd upload to cloud storage here and return the URL.
            # For this architecture, we return the file stream.
            return FileResponse(video_path, media_type="video/mp4")
        else:
            raise HTTPException(status_code=500, detail="Video file not generated.")

@app.get("/health")
def health_check():
    return {"status": "Manim Engine Online"}
