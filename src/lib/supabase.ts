import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: true,
    },
  },
);

export const createClientOnBrowser = () => {
  return createClient(
    // import.meta.env.SUPABASE_URL,
    // import.meta.env.SUPABASE_ANON_KEY,
    "https://xhjnsfeehdrnbcddxehu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhoam5zZmVlaGRybmJjZGR4ZWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNzkxMjUsImV4cCI6MjAzODk1NTEyNX0.LSzc3POzyMWwJCnxZGSRiWU7nwGwi6hsNazz38EhNUI",
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: true,
      },
    },
  );
};

