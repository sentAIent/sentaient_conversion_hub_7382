import { z } from 'zod';

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1, "Firebase API Key is required"),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase Auth Domain is required"),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase Storage Bucket is required"),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase Messaging Sender ID is required"),
  VITE_FIREBASE_APP_ID: z.string().min(1, "Firebase App ID is required"),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  
  VITE_SUPABASE_URL: z.string().min(1, "Supabase URL is required").optional(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is required").optional(),
  
  VITE_RECAPTCHA_SITE_KEY: z.string().optional(),
  
  VITE_MAXUN_API_URL: z.string().optional(),
  VITE_MAXUN_API_KEY: z.string().optional(),
  VITE_SCREENPIPE_API_URL: z.string().default('http://localhost:3030').optional(),
});

// We wrap the validation in a try/catch to provide a clear error message
let env;
try {
  // Assuming this runs in Vite context (import.meta.env)
  // If we're in a Node/CommonJS context, process.env should be used instead.
  // We provide a fallback for testing environments
  const envVars = typeof process !== 'undefined' && process.env ? process.env : import.meta.env;
  env = envSchema.parse(envVars);
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error("❌ Invalid environment variables:");
    console.error(err.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Check console for details.");
  }
}

export { env };
