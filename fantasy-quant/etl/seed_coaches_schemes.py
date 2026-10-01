import os
import psycopg2
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

def get_connection():
    # Try local Postgres first
    try:
        conn = psycopg2.connect("postgresql://postgres:postgres@localhost:54322/postgres")
        return conn
    except Exception as e:
        print(f"Could not connect to local Docker Postgres: {e}")
        # Try remote Supabase DB if credentials available
        db_url = os.getenv("DATABASE_URL")
        if db_url:
            print("Connecting to remote Supabase database...")
            return psycopg2.connect(db_url)
        raise e

def seed():
    conn = get_connection()
    conn.autocommit = True
    cursor = conn.cursor()
    
    # 1. Apply Migration
    print("Applying coaches_and_schemes migration...")
    migration_path = os.path.join(os.path.dirname(__file__), '..', 'supabase', 'migrations', '15_coaches_and_schemes.sql')
    with open(migration_path, 'r') as f:
        migration_sql = f.read()
    
    cursor.execute(migration_sql)
    print("Migration applied successfully.")
    
    # 2. Seed Coaches
    print("Seeding coaches...")
    coaches = [
        # Kansas City Chiefs
        ("Andy Reid", "HC", "KC", 25, "West Coast / Spread", None, '{"pass_ratio": 62.5, "run_ratio": 37.5}'),
        ("Matt Nagy", "OC", "KC", 16, "West Coast / Spread", None, '{"pass_ratio": 62.5, "run_ratio": 37.5}'),
        ("Steve Spagnuolo", "DC", "KC", 24, None, "4-3 Under / Cover 2", '{"blitz_rate": 32.4, "zone_pct": 68.0, "man_pct": 32.0}'),
        ("Andy Heck", "OLINE", "KC", 20, "Zone/Duo blocking", None, '{}'),
        ("Connor Embree", "WR", "KC", 8, "West Coast", None, '{}'),
        # Minnesota Vikings
        ("Kevin O'Connell", "HC", "MIN", 9, "McVay Wide Zone / Eleven Personnel", None, '{"pass_ratio": 64.0, "run_ratio": 36.0}'),
        ("Wes Phillips", "OC", "MIN", 12, "McVay Wide Zone", None, '{"pass_ratio": 64.0, "run_ratio": 36.0}'),
        ("Brian Flores", "DC", "MIN", 16, None, "3-4 Blitz-Heavy / Cover 1 & 0", '{"blitz_rate": 48.2, "zone_pct": 52.0, "man_pct": 48.0}'),
        ("Chris Kuper", "OLINE", "MIN", 7, "Wide Zone", None, '{}'),
        ("Keenan McCardell", "WR", "MIN", 10, "Wide Zone / Choice Routes", None, '{}'),
        # San Francisco 49ers
        ("Kyle Shanahan", "HC", "SF", 20, "Shanahan Wide Zone / 21 Personnel", None, '{"pass_ratio": 51.0, "run_ratio": 49.0}'),
        ("Chris Foerster", "OLINE/RunCoord", "SF", 30, "Wide Zone / Gap", None, '{}'),
        ("Steve Wilks", "DC", "SF", 22, None, "4-3 Over / Cover 3", '{"blitz_rate": 22.0, "zone_pct": 74.0, "man_pct": 26.0}'),
        # Baltimore Ravens
        ("John Harbaugh", "HC", "BAL", 26, "Power Run / Pro-Style", None, '{"pass_ratio": 48.0, "run_ratio": 52.0}'),
        ("Todd Monken", "OC", "BAL", 30, "Todd Monken College Spread / Pro-Style", None, '{"pass_ratio": 53.0, "run_ratio": 47.0}'),
        ("Mike Macdonald", "DC", "BAL", 10, None, "3-4 Disguised / Sim Pressures / Cover 3 Match", '{"blitz_rate": 26.5, "zone_pct": 72.0, "man_pct": 28.0}'),
    ]
    
    coach_ids = {}
    for name, role, team, exp, off_style, def_style, details in coaches:
        cursor.execute(
            """
            INSERT INTO public.coaches (name, role, team, experience_years, offensive_style, defensive_style, scheme_details)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
            RETURNING id, name;
            """,
            (name, role, team, exp, off_style, def_style, details)
        )
        res = cursor.fetchone()
        if res:
            coach_ids[res[1]] = res[0]
        else:
            cursor.execute("SELECT id FROM public.coaches WHERE name = %s;", (name,))
            res = cursor.fetchone()
            if res:
                coach_ids[name] = res[0]
                
    # 3. Seed Coaching Contracts
    print("Seeding coaching contracts...")
    contracts = [
        ("Andy Reid", 2024, 5, 100000000, 20000000, "Fully guaranteed; buyout equal to remaining years at full value"),
        ("Steve Spagnuolo", 2024, 3, 15000000, 5000000, "Includes HC incentives; buyout of remaining years"),
        ("Kevin O'Connell", 2022, 4, 32000000, 8000000, "standard buyout"),
        ("Brian Flores", 2023, 3, 12000000, 4000000, "Includes standard coordinator offset rules"),
        ("Kyle Shanahan", 2023, 6, 84000000, 14000000, "Top 3 highest paid; fully guaranteed buyout"),
        ("John Harbaugh", 2022, 3, 36000000, 12000000, "Standard veteran extension buyout"),
    ]
    
    for name, signed_year, years, total_val, aav, buyout in contracts:
        if name in coach_ids:
            cursor.execute(
                """
                INSERT INTO public.coaching_contracts (coach_id, signed_year, years, total_value, aav, buyout_terms, is_active)
                VALUES (%s, %s, %s, %s, %s, %s, TRUE)
                ON CONFLICT DO NOTHING;
                """,
                (coach_ids[name], signed_year, years, total_val, aav, buyout)
            )
            
    # 4. Seed Player Scheme Evaluations
    print("Seeding player scheme evaluations...")
    # Fetch player IDs
    cursor.execute("SELECT id, name FROM public.players;")
    players = {row[1]: row[0] for row in cursor.fetchall()}
    
    evals = [
        ("Patrick Mahomes", "A+", "Spread-West Coast Field General", 
         "Perfect fit for Andy Reid's pass-heavy RPO & deep vertical concepts. Excels at extending plays and scanning deep shells.",
         '{"Cover 2": "A+", "Cover 3": "A+", "Cover 4": "A", "Man-to-Man": "A+"}'),
         
        ("Justin Jefferson", "A+", "X-Receiver / Inside-Outside Weapon",
         "Perfect fit for O'Connell's McVay-style Wide Zone. Utilizes choice routes and bootleg crossers to maximize YAC.",
         '{"Cover 3": "A+", "Cover 2": "A", "Cover 4": "A+", "Man-to-Man": "A++"}'),
         
        ("Lamar Jackson", "A+", "Dual-Threat RPO Engine",
         "Unmatched fit for Monken's pro-spread run-heavy scheme. High volume RPO keeper keeps defenses frozen.",
         '{"Cover 3": "A", "Cover 2": "B+", "Cover 4": "B", "Man-to-Man": "A+"}'),
         
        ("Christian McCaffrey", "A+", "Shanahan Wide-Zone Anchor (H-Back/RB)",
         "Ideal fit for Kyle Shanahan's 21 Personnel Wide Zone. Deadly as both a perimeter zone runner and an outlet receiver.",
         '{"Cover 3": "A+", "Cover 2": "A+", "Cover 4": "A", "Man-to-Man": "A++"}')
    ]
    
    for name, rating, role, analysis, matchups in evals:
        if name in players:
            cursor.execute(
                """
                INSERT INTO public.player_scheme_evaluations (player_id, scheme_fit_rating, scheme_role, fit_analysis, matchup_vs_def_scheme)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (player_id) DO UPDATE 
                SET scheme_fit_rating = EXCLUDED.scheme_fit_rating,
                    scheme_role = EXCLUDED.scheme_role,
                    fit_analysis = EXCLUDED.fit_analysis,
                    matchup_vs_def_scheme = EXCLUDED.matchup_vs_def_scheme;
                """,
                (players[name], rating, role, analysis, matchups)
            )
            
    cursor.close()
    conn.close()
    print("Coaches & Schemes seeding complete!")

if __name__ == "__main__":
    seed()
