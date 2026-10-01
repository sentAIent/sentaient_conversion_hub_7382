import os
import re

files = {
    "loader-2.tsx": "Loader2",
    "check-circle-2.tsx": "CheckCircle2",
    "bar-chart-3.tsx": "BarChart3",
    "xcircle.tsx": "Xcircle",
    "loader.tsx": "Loader",
    "bar-chart-2.tsx": "BarChart2",
    "check-circle.tsx": "CheckCircle",
    "alert-circle.tsx": "AlertCircle",
    "bar-chart.tsx": "BarChart",
    "pie-chart.tsx": "PieChart",
    "help-circle.tsx": "HelpCircle",
    "alert-triangle.tsx": "AlertTriangle",
    "x-circle.tsx": "XCircle"
}

index_exports = []
for filename, export_name in files.items():
    filepath = f"src/components/icons/{filename}"
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace `export function Something(` with `export function {export_name}(`
        content = re.sub(r"export function \w+\(", f"export function {export_name}(", content)
        with open(filepath, 'w') as f:
            f.write(content)
        
        basename = filename.replace('.tsx', '')
        index_exports.append(f"export {{ {export_name} }} from './{basename}';")

with open("src/components/icons/index.ts", 'a') as f:
    f.write("\n" + "\n".join(index_exports) + "\n")
