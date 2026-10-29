ALTER TABLE public.user_settings ADD COLUMN IF NOT EXISTS layers jsonb DEFAULT '{"aircraft": true, "cell_towers": true, "springs": true, "disasters": true, "earthquakes": true, "power": true, "aviation": true, "emergency": true, "cameras": true, "weather_radar": false}'::jsonb;
ALTER TABLE public.user_settings ADD COLUMN IF NOT EXISTS clustering_enabled boolean DEFAULT true;
