# -*- coding: utf-8 -*-
"""
inject_logging.py - Deutsch-Lernen · Logging Injector
Chay tu thu muc goc Deutsch-Lernen:
  python inject_logging.py
"""

import os, re

GOOGLE_CLIENT_ID = "565949426173-cg9jat7abv9jbk2hktuak1sud8pc11do.apps.googleusercontent.com"
SHEET_URL = "https://script.google.com/macros/s/AKfycbw7uN5J6WwDG2vl5SgcpeeJ_ZnXDEaXLh-49VzYhQV11baq0pklFJEdhT660frW1kVS/exec"

SKIP_FILES = {"index.html", "b2c1-grammatik.html", "grammatik.html"}

FILE_NAMES = {
    "artikel.html":                     "Artikel (A1-A2)",
    "kasus_training.html":              "Kasus Training (A1-A2)",
    "negation.html":                    "Negation (A1-A2)",
    "nomen.html":                       "Nomen (A1-A2)",
    "nomi_akku_uebung.html":            "Nominativ & Akkusativ (A1-A2)",
    "personalpronomen.html":            "Personalpronomen (A1-A2)",
    "possesive.html":                   "Possessivartikel (A1-A2)",
    "pp-in-akk-dat.html":              "Praeposition Akk/Dat (A1-A2)",
    "praepositionen_a1_a2.html":        "Praepositionen (A1-A2)",
    "reflexiv.html":                    "Reflexivpronomen (A1-A2)",
    "verben-akku-dativ.html":           "Verben mit Akk/Dat (A1-A2)",
    "welche-diese.html":                "Welche/Diese (A1-A2)",
    "zahlen.html":                      "Zahlen (A1-A2)",
    "zeitangaben.html":                 "Zeitangaben (A1-A2)",
    "zeitformen.html":                  "Zeitformen (A1-A2)",
    "adjektiv.html":                    "Adjektiv (B1)",
    "adjektivdeklination.html":         "Adjektivdeklination (B1)",
    "genitiv.html":                     "Genitiv (B1)",
    "infinitiv-mit-und-ohne-zu.html":   "Infinitiv mit/ohne zu (B1)",
    "konjunktiv2.html":                 "Konjunktiv II (B1)",
    "konnektoren.html":                 "Konnektoren (B1)",
    "n-deklination.html":               "N-Deklination (B1)",
    "nebensatz-1.html":                 "Nebensatz 1 (B1)",
    "nebensatz-2.html":                 "Nebensatz 2 (B1)",
    "nomen-verb-verbindungen.html":     "Nomen-Verb-Verbindungen (B1)",
    "partizip-i-ii.html":               "Partizip I & II (B1)",
    "passiv-vorgang-zustand.html":      "Passiv (B1)",
    "praepositionaladverbien.html":     "Praepositionaladverbien (B1)",
    "relativsatz.html":                 "Relativsatz (B1)",
    "satzbildung.html":                 "Satzbildung (B1)",
    "tekamolo.html":                    "TEKAMOLO (B1)",
    "verben-mit-praposition.html":      "Verben mit Praposition (B1)",
    "wechsel-praepositionen.html":      "Wechselpraepositionen (B1)",
    "adjektive.html":                   "Adjektive (B2)",
    "indirekte-rede.html":              "Indirekte Rede (B2)",
    "nomen-verb.html":                  "Nomen-Verb (B2)",
    "praepositionen.html":              "Praepositionen (B2)",
    "redemittel.html":                  "Redemittel (B2)",
    "redewendungen.html":               "Redewendungen (B2)",
    "uebung-b2c1.html":                 "Uebung B2/C1",
    "verbalisierung.html":              "Verbalisierung (B2)",
    "verben.html":                      "Verben (B2)",
}

SNIPPET = """
// ===========================================
//  DEUTSCH-LERNEN LOGGING
// ===========================================
const _DL_CLIENT_ID = "{CLIENT_ID}";
const _DL_SHEET_URL = "{SHEET_URL}";
const _DL_FILE = "{FILE_NAME}";
let _dlUser = null;
function _dlGetUser() {
  if (_dlUser) return _dlUser;
  try { const s = localStorage.getItem('dl_user'); if (s) { _dlUser = JSON.parse(s); return _dlUser; } } catch(e) {}
  return null;
}
function _dlLog(setName, score, total) {
  const u = _dlGetUser();
  if (!u) return;
  fetch(_DL_SHEET_URL, {
    method: 'POST', mode: 'no-cors',
    body: JSON.stringify({ name: u.name, email: u.email, file: _DL_FILE, set: setName, score: score, total: total })
  }).catch(function(){});
}
"""

def inject(filepath, fname):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'DEUTSCH-LERNEN LOGGING' in content:
        print(f'  [skip] {fname} (already injected)')
        return False

    display_name = FILE_NAMES.get(fname, fname.replace('.html','').replace('-',' ').title())
    snippet = SNIPPET.replace('{CLIENT_ID}', GOOGLE_CLIENT_ID)\
                     .replace('{SHEET_URL}', SHEET_URL)\
                     .replace('{FILE_NAME}', display_name)

    hooked = False

    # ── TYPE A: updateUbScore (artikel, negation style) ──
    if 'updateUbScore' in content:
        old = "if (correct === total) document.getElementById('ut' + n).classList.add('done');"
        new = old + "\n  var _ans = ubAnswered[n] ? Object.keys(ubAnswered[n]).length : total;\n  if (_ans === total) _dlLog('Uebung ' + n, correct, total);"
        if old in content:
            content = content.replace(old, new)
            hooked = True

    # ── TYPE B: checkAll (konjunktiv2, B1/B2 style) ──
    if 'checkAll' in content and 'score-${prefix}' in content:
        old = "  const score = document.getElementById(`score-${prefix}`);"
        new = "  _dlLog(prefix, correct, data.length);\n" + old
        if old in content:
            content = content.replace(old, new)
            hooked = True

    # ── TYPE C: fallback - tim score display bat ky ──
    if not hooked:
        # Tim pattern score display cuoi function
        patterns = [
            ("score.innerHTML = ", "  _dlLog('Uebung', correct, total);\n  score.innerHTML = "),
            ("scoreDisplay.innerHTML = ", "  _dlLog('Uebung', correct, total);\n  scoreDisplay.innerHTML = "),
        ]
        for old, new in patterns:
            if old in content:
                content = content.replace(old, new, 1)
                hooked = True
                break

    if not hooked:
        print(f'  [skip] {fname} (no hook point found)')
        return False

    # Inject snippet truoc </body>
    content = content.replace('</body>', snippet + '\n</body>', 1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  [OK]   {fname}')
    return True

folders = ['A1A2/Grammatik', 'B1/Grammatik', 'B2/Grammatik']
base = os.path.dirname(os.path.abspath(__file__))

total_ok = 0
for folder in folders:
    folder_path = os.path.join(base, folder)
    if not os.path.exists(folder_path):
        print(f'[not found] {folder_path}')
        continue
    print(f'\n{folder}:')
    for fname in sorted(os.listdir(folder_path)):
        if not fname.endswith('.html') or fname in SKIP_FILES:
            continue
        if inject(os.path.join(folder_path, fname), fname):
            total_ok += 1

print(f'\nDone! {total_ok} files injected.')
