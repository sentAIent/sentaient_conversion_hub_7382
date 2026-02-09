
def simulate_layout(window_width, left_panel_width, right_panel_width):
    # Footer fixed positioning
    footer_left = left_panel_width
    footer_right = right_panel_width
    available_width = window_width - footer_left - footer_right
    
    print(f"Window: {window_width}, Left: {left_panel_width}, Right: {right_panel_width}")
    print(f"Footer Available Width: {available_width}px")

    # Content constraints
    # Left column (Visual Controls): approx 200px?
    left_col_min = 200 
    
    # Center column: max-w-4xl (896px), w-auto
    # It contains the Play button group (approx 300px min?) and the Matrix panel
    center_col_min = 300 # Rough guess for play controls
    
    # Right column (Mixer toggle): approx 100px?
    right_col_min = 100

    total_min_content = left_col_min + center_col_min + right_col_min
    print(f"Total Min Content Width (Approx): {total_min_content}px")

    if available_width < total_min_content:
        print("OVERFLOW DETECTED: Content exceeds available width.")
        print("  - 'footer-compact' class should be active.")
    else:
        print("Layout fits within available width.")

    # Check footer-compact logic from resize-panels.js
    if available_width < 600:
        print("JS Logic: Adds 'footer-compact' class.")
    elif available_width < 900:
        print("JS Logic: Adds 'footer-medium' class.")
    else:
        print("JS Logic: No specific responsive class.")

print("--- Scenario 1: Desktop, Panels Closed ---")
simulate_layout(1440, 0, 0)

print("\n--- Scenario 2: Desktop, Both Panels Open (Default) ---")
simulate_layout(1440, 256, 320)

print("\n--- Scenario 3: Laptop, Both Panels Open ---")
simulate_layout(1280, 256, 320)

print("\n--- Scenario 4: Tablet/Narrow, Both Panels Open ---")
simulate_layout(1024, 280, 340) # Custom tablet widths from CSS
