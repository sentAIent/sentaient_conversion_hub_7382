-- ==========================================
-- Migration: Add Read-Only Scenario RPC
-- ==========================================

-- Function to safely execute dynamically generated SELECT queries from the LLM Scenario Engine
CREATE OR REPLACE FUNCTION execute_read_only_query(query_text text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result json;
BEGIN
    -- VERY STRICT validation to ensure it's a READ-ONLY query
    IF query_text !~* '^\s*SELECT\b' THEN
        RAISE EXCEPTION 'Only SELECT queries are allowed via the scenario engine.';
    END IF;

    IF query_text ~* '\b(INSERT|UPDATE|DELETE|TRUNCATE|DROP|ALTER|CREATE|GRANT|REVOKE|COMMIT|ROLLBACK)\b' THEN
        RAISE EXCEPTION 'Disallowed keywords found in scenario query.';
    END IF;

    -- Execute the query and return the results as JSON
    EXECUTE format('SELECT COALESCE(json_agg(t), ''[]''::json) FROM (%s) t', query_text) INTO result;
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Scenario Engine SQL Error: %', SQLERRM;
END;
$$;

-- Grant execution permission to authenticated users (and anon if public)
GRANT EXECUTE ON FUNCTION execute_read_only_query(text) TO authenticated;
GRANT EXECUTE ON FUNCTION execute_read_only_query(text) TO anon;

-- Note: In a true production app, you might want to use a dedicated database user for this function
-- with strictly restricted table access, rather than SECURITY DEFINER. But for this analytics tool, 
-- we enforce read-only at the regex level.
