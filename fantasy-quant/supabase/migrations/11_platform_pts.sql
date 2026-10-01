-- Add platform-specific fantasy points columns
ALTER TABLE player_weekly_stats
ADD COLUMN IF NOT EXISTS yahoo_pts NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS espn_pts NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS cbs_pts NUMERIC DEFAULT 0;

-- Update the RPC to support ranking by these new platforms
CREATE OR REPLACE FUNCTION get_player_rankings(
  p_start_season INT,
  p_start_week INT,
  p_end_season INT,
  p_end_week INT,
  p_scoring_type TEXT
)
RETURNS TABLE (
  player_id UUID,
  player_name TEXT,
  "position" TEXT,
  games_played BIGINT,
  total_pts NUMERIC,
  pts_per_game NUMERIC,
  overall_rank BIGINT,
  position_rank BIGINT,
  overall_ppg_rank BIGINT,
  position_ppg_rank BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH filtered_stats AS (
    SELECT 
      ws.player_id,
      p.name AS player_name,
      p.position,
      CASE 
        WHEN p_scoring_type = 'half_ppr_pts' THEN ws.half_ppr_pts
        WHEN p_scoring_type = 'standard_pts' THEN ws.standard_pts
        WHEN p_scoring_type = 'yahoo_pts' THEN ws.yahoo_pts
        WHEN p_scoring_type = 'espn_pts' THEN ws.espn_pts
        WHEN p_scoring_type = 'cbs_pts' THEN ws.cbs_pts
        ELSE ws.ppr_pts
      END AS pts
    FROM player_weekly_stats ws
    JOIN games g ON ws.game_id = g.id
    JOIN players p ON ws.player_id = p.id
    WHERE 
      (g.season = p_start_season AND g.week >= p_start_week AND g.season = p_end_season AND g.week <= p_end_week) OR
      (g.season = p_start_season AND g.week >= p_start_week AND g.season < p_end_season) OR
      (g.season > p_start_season AND g.season < p_end_season) OR
      (g.season = p_end_season AND g.week <= p_end_week AND g.season > p_start_season)
  ),
  aggregated AS (
    SELECT 
      fs.player_id,
      fs.player_name,
      fs.position,
      COUNT(*) AS games_played,
      SUM(fs.pts) AS total_pts,
      SUM(fs.pts) / COUNT(*) AS pts_per_game
    FROM filtered_stats fs
    GROUP BY fs.player_id, fs.player_name, fs.position
  )
  SELECT 
    a.player_id,
    a.player_name,
    a.position,
    a.games_played,
    a.total_pts,
    a.pts_per_game,
    RANK() OVER (ORDER BY a.total_pts DESC) AS overall_rank,
    RANK() OVER (PARTITION BY a.position ORDER BY a.total_pts DESC) AS position_rank,
    RANK() OVER (ORDER BY a.pts_per_game DESC) AS overall_ppg_rank,
    RANK() OVER (PARTITION BY a.position ORDER BY a.pts_per_game DESC) AS position_ppg_rank
  FROM aggregated a;
END;
$$ LANGUAGE plpgsql;
