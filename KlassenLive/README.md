# KlassenLive v2 — Supabase integration prototype

This is a functional **integration starter**, not a finished production release.

## Included
- Existing v1.1 Bridge and demo files (unchanged)
- `04_KlassenLive_Core.sql`: sessions and participants shared by Live-Test and Live-Diktat, RLS and student RPCs
- `teacher.html`: teacher login, create/start/finish rooms, live student statistics
- `student.html`: join by code/name, display embedded exercise, forward submission, poll for room status
- `config.example.js`: Supabase public project configuration template

## Setup
1. Back up your Supabase project and review/run `04_KlassenLive_Core.sql` in Supabase SQL Editor. It does not modify the previous three tables.
2. Create `config.js` from `config.example.js` and paste your **public anon/publishable key** from Supabase Project Settings. Do not use secret/service_role key.
3. Ensure teacher account exists in Supabase Auth. Open `teacher.html` on GitHub Pages, sign in and create a room using an exercise URL (for example the existing `exercise-demo.html`).
4. Students open `student.html`, enter room code and name. The exercise runs in an iframe with the v1.1 Bridge. Teacher sees results after submission.

## Known limitations
- This version uses polling every 2 seconds on student devices for room state, plus realtime/polling on teacher side; suitable for a small classroom pilot.
- The student room join uses a display name, **not yet the existing kc_students roster/PIN**. Names are unique per room.
- The teacher must sign in with an existing Supabase Auth account. No teacher registration UI yet.
- A lost student token on a new device cannot be recovered; same browser uses sessionStorage.
- The iframe must use a Bridge-compatible HTML. Existing arbitrary HTML files need the Bridge integration.
- Dictation sentence controls, teacher audio controls, feedback release and detailed comparison UI are not yet implemented.
- Browser-local grading is for low-stakes class practice only.
- Supabase SQL and frontend were statically inspected but not end-to-end tested against your live project.
