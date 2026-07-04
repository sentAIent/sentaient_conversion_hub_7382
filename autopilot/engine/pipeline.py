import os
import requests
import uuid
import asyncio
import re
import subprocess
import zipfile
from moviepy.editor import ImageClip, AudioFileClip, TextClip, CompositeVideoClip, CompositeAudioClip, VideoFileClip
from moviepy.video.fx.all import resize
import urllib.parse
from PIL import Image, ImageDraw, ImageFont
from fpdf import FPDF
from mindwave_bridge import record_mindwave_visuals

def download_image(query: str, output_path: str, width=1080, height=1920):
    """Downloads an AI-generated image based on the prompt."""
    # Sanitize and truncate the query so Pollinations AI doesn't choke on huge text blocks
    clean_query = query.replace('\n', ' ').strip()
    if clean_query.startswith('http') or len(clean_query) < 5:
        clean_query = "A beautiful cinematic marketing product shot, high resolution, professional lighting"
    clean_query = clean_query[:200]
    encoded_query = urllib.parse.quote(clean_query)
    url = f"https://image.pollinations.ai/prompt/{encoded_query}?width={width}&height={height}&nologo=true"
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
    else:
        raise Exception(f"Failed to download image. Status: {response.status_code}")

def sanitize_script(script: str) -> str:
    """Removes markdown and stage directions so it sounds natural when spoken."""
    script = script.replace(">", "")
    script = script.replace("*", "")
    script = script.replace("#", "")
    script = re.sub(r'\[.*?\]', '', script)
    script = re.sub(r'\(.*?\)', '', script)
    script = re.sub(r'\s+', ' ', script).strip()
    return script

def render_document_carousel(script: str, visual_direction: str, output_path: str):
    """Generates a PDF carousel for LinkedIn."""
    pdf = FPDF(orientation='L', unit='mm', format=(280, 280)) # square for linkedin
    pdf.set_auto_page_break(auto=True, margin=15)
    
    for i in range(3):
        pdf.add_page()
        pdf.set_font("Arial", size=24)
        pdf.cell(200, 20, txt=f"Slide {i+1}", ln=True, align='C')
        pdf.set_font("Arial", size=14)
        pdf.multi_cell(200, 10, txt=script[:200] if script else "Detailed content for this slide.", align='C')
        
    pdf.output(output_path)
    return output_path

def render_static_carousel(visual_direction: str, temp_dir: str, output_zip: str):
    """Generates multiple 1:1 images and zips them for Instagram carousel."""
    images = []
    for i in range(3):
        path = os.path.join(temp_dir, f"{uuid.uuid4()}_carousel_{i}.jpg")
        download_image(f"{visual_direction} variant {i}", path, width=1080, height=1080)
        images.append(path)
        
    with zipfile.ZipFile(output_zip, 'w') as zipf:
        for img in images:
            zipf.write(img, os.path.basename(img))
    return output_zip

def render_instagram_grid(visual_direction: str, temp_dir: str, output_zip: str):
    """Downloads a master image and splits it into a 3x3 grid."""
    master_path = os.path.join(temp_dir, f"{uuid.uuid4()}_master_grid.jpg")
    download_image(visual_direction, master_path, width=1080, height=1080)
    
    img = Image.open(master_path).resize((1080, 1080))
    width, height = img.size
    grid_w = width // 3
    grid_h = height // 3
    
    images = []
    idx = 1
    for i in range(3):
        for j in range(3):
            left = j * grid_w
            top = i * grid_h
            right = (j + 1) * grid_w
            bottom = (i + 1) * grid_h
            cropped = img.crop((left, top, right, bottom))
            crop_path = os.path.join(temp_dir, f"grid_{idx}.jpg")
            cropped.save(crop_path)
            images.append(crop_path)
            idx += 1
            
    with zipfile.ZipFile(output_zip, 'w') as zipf:
        for img_path in images:
            zipf.write(img_path, os.path.basename(img_path))
    return output_zip

def render_text_asset(script: str, output_path: str):
    """Saves text content to file."""
    with open(output_path, 'w') as f:
        f.write(script)
    return output_path

def produce_campaign_asset(script: str, visual_direction: str, campaign_type: str = "short_form_video", visual_style: str = "ai_image", audio_beats: str = "none", audio_atmos: str = "none", audio_music: str = "none", audio_voiceover: bool = True, output_filename="final_video.mp4") -> dict:
    """Main routing engine for rendering 16 campaign formats."""
    
    public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public"))
    public_video_dir = os.path.join(public_dir, "videos")
    public_doc_dir = os.path.join(public_dir, "documents")
    public_image_dir = os.path.join(public_dir, "images")
    
    os.makedirs(public_video_dir, exist_ok=True)
    os.makedirs(public_doc_dir, exist_ok=True)
    os.makedirs(public_image_dir, exist_ok=True)
    os.makedirs("temp", exist_ok=True)
    
    base_name = output_filename.replace(".mp4", "")
    result_assets = {}
    
    # 1. TEXT FORMATS
    if campaign_type in ["text_thread", "seo_blog", "newsletter_asset"]:
        text_filename = f"{base_name}.txt"
        text_path = os.path.join(public_doc_dir, text_filename)
        render_text_asset(script, text_path)
        result_assets["text_url"] = f"/documents/{text_filename}"
        return result_assets

    # 2. DOCUMENT / PDF
    if campaign_type == "document_carousel":
        pdf_filename = f"{base_name}.pdf"
        pdf_path = os.path.join(public_doc_dir, pdf_filename)
        render_document_carousel(script, visual_direction, pdf_path)
        result_assets["document_url"] = f"/documents/{pdf_filename}"
        return result_assets

    # 3. ZIP OF IMAGES (Grids / Carousel)
    if campaign_type == "static_carousel":
        zip_filename = f"{base_name}_carousel.zip"
        zip_path = os.path.join(public_image_dir, zip_filename)
        render_static_carousel(visual_direction, "temp", zip_path)
        result_assets["archive_url"] = f"/images/{zip_filename}"
        return result_assets
        
    if campaign_type == "instagram_grid":
        zip_filename = f"{base_name}_grid.zip"
        zip_path = os.path.join(public_image_dir, zip_filename)
        render_instagram_grid(visual_direction, "temp", zip_path)
        result_assets["archive_url"] = f"/images/{zip_filename}"
        return result_assets

    # 4. SINGLE IMAGE GRAPHICS
    if campaign_type in ["pinterest_pin", "quote_graphic", "meme_reaction", "live_stream_asset"] and visual_style == "ai_image":
        img_filename = f"{base_name}.jpg"
        img_path = os.path.join(public_image_dir, img_filename)
        width, height = 1080, 1080
        if campaign_type == "pinterest_pin":
            width, height = 1000, 1500
        elif campaign_type == "live_stream_asset":
            width, height = 1920, 1080
            
        download_image(visual_direction, img_path, width=width, height=height)
        result_assets["image_url"] = f"/images/{img_filename}"
        return result_assets

    # 5. AUDIO & VIDEO PIPELINES
    # We always need audio generation for the remaining formats
    duration = 10
    audio_clips = []
    
    if audio_voiceover:
        vo_path = os.path.join("temp", f"{uuid.uuid4()}_vo.mp3")
        clean_script = sanitize_script(script)
        if not clean_script:
            clean_script = "This is a preview video."
        subprocess.run(["edge-tts", "--text", clean_script, "--write-media", vo_path, "--voice", "en-US-ChristopherNeural"], check=True)
        vo_clip = AudioFileClip(vo_path)
        duration = vo_clip.duration
        audio_clips.append(vo_clip)

    binaural_assets_dir = "/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/audio"
    if audio_beats != "none":
        beats_path = os.path.join(binaural_assets_dir, f"{audio_beats.replace('hz', '_freq')}.wav")
        if os.path.exists(beats_path):
            audio_clips.append(AudioFileClip(beats_path).subclip(0, duration).volumex(0.3))
            
    if audio_atmos != "none":
        atmos_path = os.path.join(binaural_assets_dir, f"{audio_atmos}.mp3")
        if os.path.exists(atmos_path):
            audio_clips.append(AudioFileClip(atmos_path).subclip(0, duration).volumex(0.4))
            
    if audio_music != "none":
        music_file = "ambient_pad.mp3" if "ambient" in audio_music else "space_journey.mp3"
        music_path = os.path.join(binaural_assets_dir, music_file)
        if os.path.exists(music_path):
            audio_clips.append(AudioFileClip(music_path).subclip(0, duration).volumex(0.5))
            
    final_audio = CompositeAudioClip(audio_clips) if audio_clips else None
    
    # 5A. PODCAST AUDIO (Audio only)
    if campaign_type == "podcast_audio":
        audio_filename = f"{base_name}.mp3"
        audio_path = os.path.join(public_video_dir, audio_filename)
        if final_audio:
            final_audio.write_audiofile(audio_path, fps=44100)
        else:
            with open(audio_path, 'w') as f:
                f.write("No audio generated.")
        result_assets["audio_mix"] = f"/videos/{audio_filename}"
        return result_assets
        
    # 5B. VIDEO FORMATS
    if visual_style != "ai_image" and visual_style != "raw_video": # anything from mindwave
        print(f"Triggering Mindwave headless renderer for {visual_style}...")
        clean_record_duration = int(duration) + 2
        video_temp_path = asyncio.run(record_mindwave_visuals(
            visual_style, 
            audio_beats=audio_beats, 
            audio_atmos=audio_atmos, 
            audio_music=audio_music, 
            duration_sec=clean_record_duration
        ))
        
        full_clip = VideoFileClip(video_temp_path)
        # Playwright records from page creation. 
        # The clean recording happens in the last `clean_record_duration` seconds.
        # Crop from the end to guarantee we skip the load screen and popups.
        start_time = max(0, full_clip.duration - clean_record_duration)
        video_clip = full_clip.subclip(start_time, start_time + duration)
    else:
        image_path = os.path.join("temp", f"{uuid.uuid4()}.jpg")
        width, height = 1080, 1920
        if campaign_type in ["long_form_video", "cinematic_broll", "audiogram", "live_stream_asset"]:
            width, height = 1920, 1080
            
        download_image(visual_direction, image_path, width=width, height=height)
        video_clip = ImageClip(image_path).set_duration(duration)
        
        # MOCK UGC AVATAR
        if campaign_type == "ugc_avatar":
            try:
                txt_clip = TextClip("[MOCK UGC AVATAR]", fontsize=70, color='white', bg_color='red').set_position('top').set_duration(duration)
                video_clip = CompositeVideoClip([video_clip, txt_clip])
            except:
                pass
    
    try:
        txt_clip = TextClip("Preview", fontsize=50, color='white', bg_color='black')
        txt_clip = txt_clip.set_position('bottom').set_duration(duration).set_opacity(0.7)
        video = CompositeVideoClip([video_clip, txt_clip])
    except Exception as e:
        print(f"Warning: TextClip failed. {e}")
        video = video_clip
        
    if final_audio:
        video = video.set_audio(final_audio)
        
    output_path = os.path.join(public_video_dir, output_filename)
    raw_output_filename = f"{base_name}_raw.mp4"
    raw_output_path = os.path.join(public_video_dir, raw_output_filename)
    audio_output_filename = f"{base_name}_audio.mp3"
    audio_output_path = os.path.join(public_video_dir, audio_output_filename)
    
    if final_audio:
        final_audio.write_audiofile(audio_output_path, fps=44100)
    else:
        with open(audio_output_path, 'w') as f:
            f.write("No audio generated.")
            
    video_clip.write_videofile(raw_output_path, fps=24, codec="libx264", preset="ultrafast", threads=4, audio=False)
    video.write_videofile(output_path, fps=24, codec="libx264", audio_codec="aac", preset="ultrafast", threads=4)
    
    result_assets["final_video"] = f"/videos/{output_filename}"
    result_assets["raw_video"] = f"/videos/{raw_output_filename}"
    result_assets["audio_mix"] = f"/videos/{audio_output_filename}"
    
    return result_assets
