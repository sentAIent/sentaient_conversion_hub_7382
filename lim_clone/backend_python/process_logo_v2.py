from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # We will do a simple flood fill from (0,0) with transparency.
    # ImageDraw.floodfill doesn't work well for RGBA transparency replacement in all PIL versions, 
    # so we'll do a custom BFS.
    
    width, height = img.size
    pixels = img.load()
    
    # Get the background color from top-left
    bg_color = pixels[0, 0]
    bg_r, bg_g, bg_b, _ = bg_color
    
    def is_similar(p, bg):
        pr, pg, pb, _ = p
        # If it's a grey background, we can assume R,G,B are very close
        # And distance to bg color is small
        dist = abs(pr - bg[0]) + abs(pg - bg[1]) + abs(pb - bg[2])
        # Allow quite a bit of variance for gradients
        return dist < 80 and abs(pr - pg) < 15 and abs(pg - pb) < 15
        
    visited = set()
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    # Also add borders
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height-1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width-1, y))
        
    for q in queue:
        visited.add(q)
        
    # Queue for BFS
    from collections import deque
    dq = deque(queue)
    
    while dq:
        x, y = dq.popleft()
        
        if is_similar(pixels[x, y], bg_color):
            # Make transparent
            pixels[x, y] = (0, 0, 0, 0)
            
            # Check neighbors
            for dx, dy in [(0,1), (1,0), (0,-1), (-1,0)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    dq.append((nx, ny))
                    
    # Anti-aliasing pass: any non-transparent pixel surrounded by transparent ones gets its alpha reduced
    for y in range(1, height-1):
        for x in range(1, width-1):
            if pixels[x, y][3] != 0:
                trans_neighbors = 0
                for dx, dy in [(0,1), (1,0), (0,-1), (-1,0)]:
                    if pixels[x+dx, y+dy][3] == 0:
                        trans_neighbors += 1
                if trans_neighbors > 0:
                    r, g, b, a = pixels[x, y]
                    pixels[x, y] = (r, g, b, max(50, 255 - trans_neighbors * 50))
                    
    img.save(output_path, "PNG")

remove_background(
    "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/assets/images/contango_logo.png",
    "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_transparent.png"
)
print("Done with BFS floodfill!")
