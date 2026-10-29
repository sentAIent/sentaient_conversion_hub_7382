from manim import *

class BreathingMandala(Scene):
    """
    A mesmerising, infinite-looping Sacred Geometry scene
    used for the MindWave Scenery Simulator (visualMode: 'manim')
    """
    def construct(self):
        # Create a central golden circle
        center_circle = Circle(radius=1.5, color=GOLD).set_stroke(width=4)
        
        # Create petals
        petals = VGroup()
        for i in range(12):
            petal = Circle(radius=1.5, color=BLUE_E).set_stroke(width=2)
            petal.shift(UP * 1.5)
            petal.rotate(i * TAU / 12, about_point=ORIGIN)
            petals.add(petal)

        # Animation sequence
        self.play(Create(center_circle), run_time=2)
        self.play(Create(petals), run_time=4, rate_func=there_and_back)
        
        # Simulate 4-7-8 breathing expansion
        self.play(petals.animate.scale(1.5).set_color(TEAL), run_time=4)  # Inhale
        self.wait(7) # Hold
        self.play(petals.animate.scale(1/1.5).set_color(BLUE_E), run_time=8) # Exhale
        
        self.wait(1)

# To render locally to 4K MP4 for the React App:
# manim -qk sacred_geometry.py BreathingMandala
