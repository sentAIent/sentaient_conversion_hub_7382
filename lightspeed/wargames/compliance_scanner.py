import os
import json
import time
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv(dotenv_path="../.env")

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Missing Supabase credentials in .env")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

RULES = [
    {
        "framework": "SOC2",
        "rule_id": "CC6.1",
        "description": "Logical access security: User access is restricted and reviewed.",
        "status": "passed"
    },
    {
        "framework": "SOC2",
        "rule_id": "CC6.6",
        "description": "System boundaries are protected by firewalls and intrusion detection.",
        "status": "passed"
    },
    {
        "framework": "HIPAA",
        "rule_id": "164.312(a)(1)",
        "description": "Access Control: Unique user identification and emergency access.",
        "status": "passed"
    },
    {
        "framework": "HIPAA",
        "rule_id": "164.312(e)(1)",
        "description": "Transmission Security: Data encrypted in transit.",
        "status": "passed"
    }
]

def run_compliance_scan():
    print("Running compliance scan...")
    # Fetch active incidents
    res = supabase.table("incidents").select("*").eq("is_fixed", False).execute()
    incidents = res.data

    has_network_issue = any("firewall" in i.get("title", "").lower() or "network" in i.get("explanation", "").lower() for i in incidents)
    has_access_issue = any("auth" in i.get("title", "").lower() or "access" in i.get("explanation", "").lower() for i in incidents)

    for rule in RULES:
        # Dynamic evaluation
        if rule["rule_id"] == "CC6.6" and has_network_issue:
            rule["status"] = "failed"
            rule["details"] = {"reason": "Active network or firewall incident detected."}
        elif rule["rule_id"] == "CC6.1" and has_access_issue:
            rule["status"] = "failed"
            rule["details"] = {"reason": "Active authentication or access control incident detected."}
        else:
            rule["status"] = "passed"
            rule["details"] = {"reason": "No violating incidents detected."}

        # Upsert rule
        # Since we don't have a unique constraint on rule_id in the DB, we will check if it exists first
        existing = supabase.table("compliance_checks").select("*").eq("rule_id", rule["rule_id"]).execute()
        
        if existing.data and len(existing.data) > 0:
            supabase.table("compliance_checks").update({
                "status": rule["status"],
                "details": rule["details"],
                "last_checked": "now()"
            }).eq("rule_id", rule["rule_id"]).execute()
        else:
            supabase.table("compliance_checks").insert(rule).execute()

    print("Compliance scan complete.")

if __name__ == "__main__":
    while True:
        try:
            run_compliance_scan()
        except Exception as e:
            print(f"Scan failed: {e}")
        time.sleep(10)
