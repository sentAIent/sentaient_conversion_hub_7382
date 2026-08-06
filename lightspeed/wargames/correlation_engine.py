import os
import time
import uuid
import random
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv(dotenv_path="../.env")

supabase_url = os.getenv("VITE_SUPABASE_URL")
supabase_key = os.getenv("VITE_SUPABASE_ANON_KEY")

if not supabase_url or not supabase_key:
    print("Error: Supabase environment variables not found.")
    exit(1)

supabase: Client = create_client(supabase_url, supabase_key)

# Mock correlation rules for demonstration
def generate_iac(incident_type, title):
    if "SQL Injection" in title or "WAF" in title:
        return """resource "aws_wafv2_web_acl" "sqli_protection" {
  name  = "block-sqli"
  scope = "REGIONAL"

  rule {
    name     = "SQLiRule"
    priority = 1
    action { block {} }
    statement {
      sqli_match_statement {
        field_to_match { all_query_arguments {} }
        text_transformation { priority = 1; type = "URL_DECODE" }
        text_transformation { priority = 2; type = "HTML_ENTITY_DECODE" }
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "SQLiRule"
      sampled_requests_enabled   = true
    }
  }
}"""
    elif "S3" in title or "Bucket" in title:
        return """resource "aws_s3_bucket_public_access_block" "secure_bucket" {
  bucket = aws_s3_bucket.example.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}"""
    else:
        return """resource "aws_security_group_rule" "isolate_instance" {
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["10.0.0.0/8"]
  security_group_id = var.security_group_id
}"""

def run_correlation():
    print("🔍 Running AI Correlation Engine...")
    
    # Fetch ungrouped incidents
    response = supabase.table('incidents').select('*').is_('correlation_id', 'null').eq('is_fixed', False).execute()
    incidents = response.data
    
    if not incidents:
        print("✅ No ungrouped incidents found.")
        return

    print(f"Found {len(incidents)} ungrouped incidents. Analyzing...")
    
    # Simple grouping logic: Group by 'source' or 'type'
    groups = {}
    for inc in incidents:
        # We group by the first word of the title as a simple heuristic for testing
        key = inc['title'].split()[0] if inc['title'] else 'Generic'
        if key not in groups:
            groups[key] = []
        groups[key].append(inc)

    for key, grouped_incidents in groups.items():
        if len(grouped_incidents) > 0:
            correlation_id = f"GRP-{str(uuid.uuid4())[:8].upper()}"
            print(f"🔗 Grouping {len(grouped_incidents)} incidents under {correlation_id} (Key: {key})")
            
            # Generate an IaC fix for the group
            iac = generate_iac(grouped_incidents[0]['type'], grouped_incidents[0]['title'])
            
            for inc in grouped_incidents:
                supabase.table('incidents').update({
                    'correlation_id': correlation_id,
                    'proposed_fix_iac': iac
                }).eq('id', inc['id']).execute()
            
            # Post a ChatOps message
            supabase.table("chatops_messages").insert({
                "sender": "System",
                "message": f"🤖 AI Correlation Engine grouped {len(grouped_incidents)} alerts into {correlation_id}. Auto-remediation IaC generated and ready for review.",
                "channel": "general"
            }).execute()

if __name__ == "__main__":
    while True:
        try:
            run_correlation()
        except Exception as e:
            print(f"Error in correlation engine: {e}")
        time.sleep(15) # Run every 15 seconds
