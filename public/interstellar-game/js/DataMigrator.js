// DataMigrator.js - Handles migrating local data to Supabase
export class DataMigrator {
    static async migrateToSupabase(supabaseClient) {
        try {
            console.log("🚀 Starting data migration to Supabase...");
            
            // 1. Read existing local data
            const playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
            const playerGems = parseInt(localStorage.getItem('playerGems')) || 0;
            const playerStats = JSON.parse(localStorage.getItem('playerStats')) || {};
            const credits = parseInt(localStorage.getItem('credits')) || 1000;
            const unlockedShips = JSON.parse(localStorage.getItem('unlockedShips')) || ['interceptor', 'hauler', 'orion', 'draco', 'phoenix'];

            const userId = localStorage.getItem('guest_user_id') || `guest_${Date.now()}`;
            localStorage.setItem('guest_user_id', userId);

            // 2. Build migration payload
            const payload = {
                id: userId, // Assuming we allow manual inserts or this is handled by Auth later
                credits: credits,
                gems: playerGems,
                inventory: playerInventory,
                stats: playerStats,
                unlocked_ships: unlockedShips,
                migrated_at: new Date().toISOString()
            };

            // 3. Upsert to Supabase
            // Note: This requires a 'profiles' table to exist in Supabase
            const { data, error } = await supabaseClient
                .from('profiles')
                .upsert(payload)
                .select();

            if (error) {
                console.error("❌ Supabase Migration Error:", error.message);
                return false;
            }

            console.log("✅ Data successfully migrated to Supabase!", data);
            
            // 4. Mark as migrated so we don't do it on every boot
            localStorage.setItem('supabase_migrated', 'true');
            return true;

        } catch (e) {
            console.error("❌ Fatal Error during Supabase migration:", e);
            return false;
        }
    }
}
