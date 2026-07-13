from PIL import Image

def color_distance(c1, c2):
    return sum((a - b)**2 for a, b in zip(c1[:3], c2[:3])) ** 0.5

def flood_fill_transparent(img, start_x, start_y, threshold=50):
    pixels = img.load()
    width, height = img.size
    start_color = pixels[start_x, start_y]
    
    # If starting pixel is already transparent, ignore
    if start_color[3] < 20:
        return

    q = [(start_x, start_y)]
    visited = set()
    visited.add((start_x, start_y))
    
    # Target color: fully transparent
    transparent = (0, 0, 0, 0)
    
    # BFS
    while q:
        x, y = q.pop(0)
        
        # Make transparent
        pixels[x, y] = transparent
        
        for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    visited.add((nx, ny))
                    curr_color = pixels[nx, ny]
                    # Check if it's opaque and within color distance
                    if curr_color[3] > 20:
                        if color_distance(curr_color, start_color) < threshold:
                            q.append((nx, ny))

img = Image.open("/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v10.png").convert("RGBA")
width, height = img.size

# Left hole (C)
flood_fill_transparent(img, width//4, height//2, threshold=45)

# Right hole (Q)
flood_fill_transparent(img, 3*width//4, height//2, threshold=45)

# Additionally, let's remove any other gray pixels that match the background heavily near the borders?
# The BFS should get everything inside the hole.

img.save("/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v10.png")
img.save("/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/contango_logo_v10.png")
