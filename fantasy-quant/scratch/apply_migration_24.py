import psycopg2
import sys
import os
from dotenv import load_dotenv

def apply_migration():
    load_dotenv('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/fantasy-quant/.env.local')
    
    conn = psycopg2.connect(
        dbname='postgres',
        user='postgres',
        password=os.environ.get('SUPABASE_DB_PASSWORD', 'postgres'),
        host=os.environ.get('SUPABASE_DB_HOST', '127.0.0.1'),
        port=5432
    )
    conn.autocommit = True
    cursor = conn.cursor()
    
    with open('/Users/ute/.gemini/antigravity/brain/c537b53d-0120-4c75-b74c-06f69078f03b/migration_24_accuracy.sql', 'r') as f:
        sql = f.read()
        
    try:
        cursor.execute(sql)
        print("Migration 24 applied successfully to local postgres.")
    except Exception as e:
        print(f"Error applying migration: {e}")
        sys.exit(1)
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    apply_migration()
