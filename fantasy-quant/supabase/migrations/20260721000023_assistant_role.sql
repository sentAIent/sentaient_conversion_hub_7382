-- 1. Create a restricted read-only role for the AI assistant
CREATE ROLE readonly_assistant NOLOGIN;

-- 2. Grant USAGE on schemas
GRANT USAGE ON SCHEMA public TO readonly_assistant;

-- 3. Grant SELECT strictly on the tables the AI is allowed to query
GRANT SELECT ON public.players TO readonly_assistant;
GRANT SELECT ON public.games TO readonly_assistant;
GRANT SELECT ON public.player_weekly_stats TO readonly_assistant;
GRANT SELECT ON public.player_projections TO readonly_assistant;
GRANT SELECT ON public.projection_sources TO readonly_assistant;
GRANT SELECT ON public.player_opportunities_challenges TO readonly_assistant;

-- Note: DO NOT grant access to user_settings, paper_accounts, or profiles to prevent PII/private data leaks.

-- 4. Create an execution function that switches context to the readonly_assistant role
-- This allows the main authenticated API (which uses service_role or authenticated role)
-- to run a query strictly under the permissions of readonly_assistant.

CREATE OR REPLACE FUNCTION exec_sql_readonly(query_text text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER -- Runs as the definer (postgres), but we switch roles inside
AS $$
DECLARE
    result jsonb;
BEGIN
    -- Switch to the restricted role
    SET LOCAL ROLE readonly_assistant;
    
    -- Execute the query and aggregate results into a JSONB array
    EXECUTE format('SELECT COALESCE(jsonb_agg(row_to_json(t)), ''[]''::jsonb) FROM (%s) t', query_text) 
    INTO result;
    
    -- Reset the role back to what it was
    RESET ROLE;
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        -- Ensure role is reset even if execution fails
        RESET ROLE;
        RAISE;
END;
$$;

-- Allow authenticated users to execute this function
GRANT EXECUTE ON FUNCTION exec_sql_readonly(text) TO authenticated;
GRANT EXECUTE ON FUNCTION exec_sql_readonly(text) TO service_role;
