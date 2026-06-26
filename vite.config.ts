import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Fallback values for the public Supabase URL + anon key. These are safe to ship in the
// client bundle (anon key is RLS-protected) and guarantee the published build can reach
// the backend even if the managed .env is missing at build time.
const SUPABASE_URL_FALLBACK = "https://nuiaqcktaxrlkdgkapkp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY_FALLBACK =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51aWFxY2t0YXhybGtkZ2thcGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMjk4NDYsImV4cCI6MjA5NzgwNTg0Nn0.2nqMKWo88ZsalvNusxwOjOP_aIiUItYeL-Gva3BMMGQ";
const SUPABASE_PROJECT_ID_FALLBACK = "nuiaqcktaxrlkdgkapkp";

export default defineConfig(({ mode }) => ({
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
      process.env.VITE_SUPABASE_URL ?? SUPABASE_URL_FALLBACK,
    ),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? SUPABASE_PUBLISHABLE_KEY_FALLBACK,
    ),
    "import.meta.env.VITE_SUPABASE_PROJECT_ID": JSON.stringify(
      process.env.VITE_SUPABASE_PROJECT_ID ?? SUPABASE_PROJECT_ID_FALLBACK,
    ),
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip", "@radix-ui/react-toast"],
          "supabase": ["@supabase/supabase-js"],
          "charts": ["recharts"],
        },
      },
    },
  },
}));
