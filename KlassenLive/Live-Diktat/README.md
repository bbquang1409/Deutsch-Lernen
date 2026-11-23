# KlassenLive · Live-Diktat

Zweiter Teil von KlassenLive (neben Live-Test). Dieser Ordner liegt **in** `KlassenLive/`.

Diktat im Unterricht: Der Lehrer steuert, die Schüler schreiben auf dem Handy. Es werden keine Daten gespeichert.

| Datei / Ordner | Zweck |
|---|---|
| `teacher.html` | Lehrer: Diktat wählen, Audio testen, Raum öffnen |
| `student.html` | Schüler: Code + Name eingeben |
| `hoeren-diktat/` | Das Selbstlern-Modul (42 Lektionen, MP3, Editor). **Einzige Datenquelle** – Live-Diktat liest Lektionen und Audio von hier |

Neue Lektion: im Modul `hoeren-diktat/` hinzufügen (siehe dessen README). Live-Diktat findet sie automatisch.
Supabase-Zugang: `../config.js` (die Datei von Live-Test, wird mitbenutzt).

Adressen (GitHub Pages):
- Lehrer: `/Deutsch-Lernen/KlassenLive/Live-Diktat/teacher.html`
- Schüler: `/Deutsch-Lernen/KlassenLive/Live-Diktat/student.html`
