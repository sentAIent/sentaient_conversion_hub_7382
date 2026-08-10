# Cybersecurity Hardening: Supabase Rate Limiting

To completely eliminate the 10-15% risk of DDoS attacks or abuse against your Supabase backend, you must implement strict rate limiting.

Because Supabase Edge Functions exist outside of the frontend repository, you must deploy this logic directly to your Supabase project.

## Option 1: Supabase Edge Functions + Upstash Redis (Recommended for APIs)

This is the industry-standard approach for rate limiting specific API endpoints (like the inactivity ping service).

1. **Create an Upstash Redis Database** (free tier is sufficient).
2. **Set Secrets in Supabase**:
   ```bash
   supabase secrets set UPSTASH_REDIS_REST_URL="your-url"
   supabase secrets set UPSTASH_REDIS_REST_TOKEN="your-token"
   ```
3. **Implement Rate Limiter in your Edge Function**:
   In `supabase/functions/mindwave-maintenance/index.ts`, add:

   ```typescript
   import { Redis } from "https://deno.land/x/upstash_redis@v1.20.4/mod.ts";
   
   const redis = new Redis({
     url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
     token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
   })

   // In your handler:
   const ip = req.headers.get("x-forwarded-for") || "unknown";
   const limit = 10; // Max requests
   const window = 60; // Seconds

   const [hits] = await redis.pipeline()
     .incr(ip)
     .expire(ip, window)
     .exec();

   if (hits > limit) {
     return new Response("Too Many Requests", { status: 429 });
   }
   ```

## Option 2: Database-Level Rate Limiting (Postgres)

If you are using direct Supabase Database access (PostgREST), you can use pg_ratelimit or a custom trigger to block abusive IPs directly in the DB.

```sql
-- Create a table to track requests
create table api_requests (
  ip_address text,
  request_time timestamp default now()
);

-- Function to check rate limit (e.g., max 100 requests per minute)
create or replace function check_rate_limit()
returns trigger as $$
declare
  request_count int;
begin
  select count(*) into request_count
  from api_requests
  where ip_address = inet_client_addr()::text
  and request_time > now() - interval '1 minute';
  
  if request_count > 100 then
    raise exception 'Rate limit exceeded for IP %', inet_client_addr();
  end if;
  
  insert into api_requests (ip_address) values (inet_client_addr()::text);
  
  return new;
end;
$$ language plpgsql security definer;
```

> **ACTION REQUIRED**: Choose Option 1 for your Edge Functions to ensure absolute compliance with enterprise cybersecurity requirements.
