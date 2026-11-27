# KlassenLive

Zwei getrennte Werkzeuge für den Unterricht, eine gemeinsame Anmeldung für Lehrer.

## Struktur
- `index.html` – Hub: Lehrer melden sich einmal an und wählen Live-Test oder Live-Diktat.
- `Live-Test/` – Übung mit Zeitlimit (`teacher.html`, `student.html`, `exercise-demo.html`, `klassenlive-bridge.js`). Braucht Supabase-Tabellen (`04_KlassenLive_Core.sql`).
- `Live-Diktat/` – Diktat Satz für Satz (`teacher.html`, `student.html`, `hoeren-diktat/`). Nutzt nur Supabase Realtime, keine Datenbank, nichts wird gespeichert.
- `config.js` – Supabase-URL und öffentlicher Schlüssel (siehe `config.example.js`). Niemals einen service_role- oder Secret-Key eintragen.
- `style.css`, `ui.js` – gemeinsames Design und Bestätigungsdialog.

## Einrichten
1. `04_KlassenLive_Core.sql` einmal im Supabase SQL Editor ausführen (nur für Live-Test).
2. `config.js` aus `config.example.js` erstellen und den öffentlichen Schlüssel eintragen.
3. Lehrer-Konto in Supabase Auth anlegen. Hub öffnen und anmelden.
4. Schüler öffnen die Seite per QR-Code oder Link aus dem Raum. Der Hub ist nur für Lehrer.

## Live-Diktat: Audiodateien
Pro Lektion liegt die MP3 in `Live-Diktat/hoeren-diktat/assets/audio/`. Optional: `<id>_ueberblick.mp3` (ungeschnittener Text) für die Überblick-Phase.

## Bekannte Grenzen
- Live-Test: Auswertung läuft im Browser (nur für Übungen ohne Notendruck).
- Live-Test: Wenn der Lehrer den Tab schließt, wird der Raum nicht automatisch beendet.
