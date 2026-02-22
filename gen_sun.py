import math

def generate_sun_svg():
    cx, cy = 50, 50
    outer_r = 18
    ray_outer = 38
    
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">']
    
    # We want a white border for contrast. We can do this by wrapping everything in a g tag with white stroke,
    # and then drawing it again with black fill and no stroke?
    # Better: just use stroke.
    svg.append('<g stroke="white" stroke-width="3" stroke-linejoin="round">')
    
    # Inner ring (black with white stroke)
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="{14}" stroke="black" stroke-width="7" fill="none" />')
    
    # Rays
    path_d = ""
    for i in range(12):
        angle_deg = i * 30
        
        a_base1 = math.radians(angle_deg - 7)
        a_base2 = math.radians(angle_deg + 7)
        a_tip = math.radians(angle_deg + 4)
        
        x1 = cx + outer_r * math.cos(a_base1)
        y1 = cy + outer_r * math.sin(a_base1)
        
        x2 = cx + outer_r * math.cos(a_base2)
        y2 = cy + outer_r * math.sin(a_base2)
        
        xtip = cx + ray_outer * math.cos(a_tip)
        ytip = cy + ray_outer * math.sin(a_tip)
        
        c1x = cx + 26 * math.cos(math.radians(angle_deg - 6))
        c1y = cy + 26 * math.sin(math.radians(angle_deg - 6))
        
        c2x = cx + 26 * math.cos(math.radians(angle_deg + 12))
        c2y = cy + 26 * math.sin(math.radians(angle_deg + 12))
        
        path_d += f"M {x1:.1f} {y1:.1f} Q {c1x:.1f} {c1y:.1f} {xtip:.1f} {ytip:.1f} Q {c2x:.1f} {c2y:.1f} {x2:.1f} {y2:.1f} Z "

    svg.append(f'<path d="{path_d}" fill="black" />')
    
    # Draw the inner ring again with black stroke to overlay the white strokes of the rays where they intersect
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="{14}" stroke="black" stroke-width="7" fill="none" />')
    
    svg.append('</g>')
    svg.append('</svg>')
    
    with open("sun_cursor.svg", "w") as f:
        f.write("\n".join(svg))

generate_sun_svg()
