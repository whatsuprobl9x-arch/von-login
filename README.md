von-login
=========

This is a Vercel-ready project (frontend + serverless API routes) using Vite + React and Supabase.
API routes live in /api and use the Supabase service role key for server actions.

Deploy steps:
1. Push this repo to GitHub.
2. Import the project in Vercel. Root directory should be this repository root.
3. In Vercel Project Settings > Environment Variables, ensure the following exist:
   - SUPABASE_URL (created by Supabase integration)
   - NEXT_PUBLIC_SUPABASE_ANON_KEY (created by Supabase integration)
   - SUPABASE_SERVICE_ROLE_KEY (created by Supabase integration)
   - JWT_SECRET (create this manually)
4. Deploy. After deploy, run the SQL in supabase-insert.sql (or via Supabase SQL editor) to create tables + seed users.

Files of interest:
- /api/*.js  -> serverless functions (auth, admin, model, support)
- /lib/supabase.js -> supabase client (admin + anon)
- /src/... -> React frontend (Login + Dashboards)
- supabase-insert.sql -> create tables + insert required users
