import re

js_file = "binaural-assets/js/visuals/visualizer_v4.js"
with open(js_file, "r") as f:
    js = f.read()

# Replace linear rotation with an exponential curve so it only barrels in the upper 10%
old_math = "float maxRotation = activeCurl * 0.8;"
new_math = "float maxRotation = pow(activeCurl / 4.0, 5.0) * 3.2;"

if old_math in js:
    js = js.replace(old_math, new_math)
    with open(js_file, "w") as f:
        f.write(js)
    print("Patched curl tightness curve.")
else:
    print("Could not find the linear curl math.")

