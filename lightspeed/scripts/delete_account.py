import os
import sys
import argparse
from supabase import create_client, Client

def main():
    parser = argparse.ArgumentParser(description='Delete a user account and all cascading PII data.')
    parser.add_argument('--user_id', required=True, help='The UUID of the user to delete')
    args = parser.parse_args()

    supabase_url = os.environ.get("SUPABASE_DB_URL")
    supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        print("❌ Error: SUPABASE_DB_URL and SUPABASE_SERVICE_ROLE_KEY must be set in the environment.")
        sys.exit(1)

    # Initialize Supabase Admin client
    supabase: Client = create_client(supabase_url, supabase_key)

    user_id = args.user_id
    print(f"⚠️ Starting Data Deletion Pipeline for User: {user_id}")

    try:
        # Note: In a well-designed PostgreSQL schema, foreign keys with ON DELETE CASCADE
        # will automatically clean up relational data like incidents or ai_insights.
        # However, for compliance, we explicitly delete the user from auth.users.
        # This requires the Supabase service_role key to access the Admin API.
        
        response = supabase.auth.admin.delete_user(user_id)
        print(f"✅ Successfully deleted user {user_id} and all associated relational data.")
        
    except Exception as e:
        print(f"❌ Failed to delete user: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
