import os
import sys
import subprocess
from datetime import datetime

# Define the sequence of ETL scripts to run
PIPELINE_STAGES = [
    {"name": "1. Scrape NFL Base Data", "script": "scrape_nfl.py"},
    {"name": "2. Ingest Base Data", "script": "ingest.py"},
    {"name": "3. Ingest ADP Data", "script": "ingest_adp.py"},
    {"name": "4. Ingest Vegas Odds (Historical)", "script": "ingest_vegas.py"},
    {"name": "5. Ingest Advanced Stats", "script": "ingest_advanced_stats.py"},
    {"name": "6. Ingest DFS Salaries", "script": "ingest_dfs_salaries.py"},
    {"name": "7. Scrape Weather Data", "script": "scrape_weather.py"},
    {"name": "8. Scrape Injury Reports", "script": "scrape_injuries.py"},
    {"name": "9. Generate Premium Signals", "script": "generate_signals.py"}
]

def print_header(title: str):
    print("\n" + "="*50)
    print(f" {title} ")
    print("="*50)

def run_script(script_name: str) -> bool:
    script_path = os.path.join(os.path.dirname(__file__), script_name)
    if not os.path.exists(script_path):
        print(f"ERROR: Script not found -> {script_path}")
        return False
    
    python_exe = sys.executable
    print(f"-> Executing {script_name}...")
    
    try:
        # Run subprocess
        result = subprocess.run(
            [python_exe, script_path],
            check=True,
            capture_output=False
        )
        return True
    except subprocess.CalledProcessError as e:
        print(f"ERROR: Script {script_name} failed with exit code {e.returncode}")
        return False

def main():
    print_header("FANTASY QUANT ETL PIPELINE")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Using Python: {sys.executable}\n")
    
    success_count = 0
    total_stages = len(PIPELINE_STAGES)
    
    for idx, stage in enumerate(PIPELINE_STAGES, 1):
        print(f"[{idx}/{total_stages}] {stage['name']}")
        
        success = run_script(stage['script'])
        if success:
            success_count += 1
            print("✓ Success\n")
        else:
            print("✗ FAILED\n")
            print("Pipeline halted due to error.")
            break
            
    print_header("PIPELINE SUMMARY")
    print(f"Completed: {success_count} / {total_stages} stages")
    
    if success_count == total_stages:
        print("Status: SUCCESS - All ETL jobs completed successfully.")
    else:
        print("Status: FAILED - Pipeline did not complete successfully.")
        
if __name__ == "__main__":
    main()
