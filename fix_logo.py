from PIL import Image

def make_transparent():
    # The artifact from the user
    img_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg"
    out_path = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_transparent.png"
    
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # If pixel is near-white (assuming white background), make it transparent
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(out_path, "PNG")

make_transparent()
