-- Materialize SQL Definitions for Phase 7
-- These run in a Materialize cluster to maintain millisecond-latency materialized views of live Redpanda data

-- 1. Create the source connection to Redpanda
CREATE CONNECTION IF NOT EXISTS redpanda_conn TO KAFKA (
    BROKER 'localhost:9092'
);

-- 2. Define the raw stream of live plays
CREATE SOURCE IF NOT EXISTS live_nfl_plays
    FROM KAFKA CONNECTION redpanda_conn (TOPIC 'live-nfl-plays')
    FORMAT JSON;

-- 3. Create a real-time incrementally updated Materialized View
-- This view instantly recalculates total fantasy points for players as data streams in
CREATE MATERIALIZED VIEW IF NOT EXISTS live_player_fantasy_points AS
    SELECT 
        (data->>'player')::text AS player_name,
        (data->>'game_id')::text AS game_id,
        SUM((data->>'fantasy_points')::numeric) AS total_live_points,
        COUNT(*) AS total_plays_involved,
        MAX((data->>'timestamp')::bigint) AS last_play_timestamp
    FROM live_nfl_plays
    GROUP BY 
        (data->>'player')::text,
        (data->>'game_id')::text;

-- Next.js will connect to Materialize via PostgreSQL wire protocol
-- and run: SELECT * FROM live_player_fantasy_points WHERE player_name = 'CeeDee Lamb';
-- The result returns in <10ms because it is pre-computed in memory.
