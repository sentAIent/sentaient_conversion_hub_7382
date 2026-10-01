import os

migrations_dir = "/Users/ute/Dev/sentaient_conversion_hub_7382-Website/fantasy-quant/supabase/migrations"

files_to_rename = {
    "09_gamification.sql": "20260721000009_gamification.sql",
    "15_coaches_and_schemes.sql": "20260721000015_coaches_and_schemes.sql",
    "16_sos_and_injuries.sql": "20260721000016_sos_and_injuries.sql",
    "17_creator_marketplace.sql": "20260721000017_creator_marketplace.sql",
    "18_syndicates.sql": "20260721000018_syndicates.sql",
    "19_api_portal.sql": "20260721000019_api_portal.sql",
    "20_real_money_and_jarvis.sql": "20260721000020_real_money_and_jarvis.sql",
    "21_syndicate_chats.sql": "20260721000021_syndicate_chats.sql",
    "22_keep_alive_cron.sql": "20260721000022_keep_alive_cron.sql"
}

for old_name, new_name in files_to_rename.items():
    old_path = os.path.join(migrations_dir, old_name)
    new_path = os.path.join(migrations_dir, new_name)
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed {old_name} -> {new_name}")
    else:
        print(f"File {old_name} does not exist, skipping.")
