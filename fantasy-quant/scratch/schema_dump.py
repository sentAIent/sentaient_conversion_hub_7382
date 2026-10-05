import os
import psycopg2
from dotenv import load_dotenv

load_dotenv('.env.local')

conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password=os.environ.get('SUPABASE_DB_PASSWORD', 'postgres'),
    host=os.environ.get('SUPABASE_DB_HOST', '127.0.0.1'),
    port=5432
)
cur = conn.cursor()

tables = [
    'player_stats_weekly', 'player_projections', 'player_advanced_stats',
    'player_vegas_props', 'team_coverage_tendencies', 'player_matchups',
    'player_dfs_salaries', 'dfs_salaries', 'player_injuries', 'player_signals'
]

for t in tables:
    try:
        cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{t}';")
        cols = [r[0] for r in cur.fetchall()]
        print(f"TABLE {t}: {', '.join(cols)}")
    except Exception as e:
        print(f"Error on {t}: {e}")

conn.close()
