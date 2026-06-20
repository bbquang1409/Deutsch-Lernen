# -*- coding: utf-8 -*-
"""
fix_snippet_position.py
Chay tu thu muc goc Deutsch-Lernen:
  python fix_snippet_position.py

Chuyen snippet logging tu truoc </body> vao trong <script> truoc </head>
de fix loi "_dlLog is not defined"
"""

import os

MARKER = "// ===========================================\n//  DEUTSCH-LERNEN LOGGING"
SKIP = {"index.html", "b2c1-grammatik.html", "grammatik.html", "dashboard.html"}

folders = [
    "A1A2/Grammatik",
    "B1/Grammatik",
    "B2/Grammatik",
]

base = os.path.dirname(os.path.abspath(__file__))
ok = 0
skip = 0

for folder in folders:
    folder_path = os.path.join(base, folder)
    if not os.path.exists(folder_path):
        print(f"[not found] {folder_path}")
        continue
    print(f"\n{folder}:")
    for fname in sorted(os.listdir(folder_path)):
        if not fname.endswith('.html') or fname in SKIP:
            continue
        fpath = os.path.join(folder_path, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        if MARKER not in content:
            print(f"  [skip] {fname} (no snippet)")
            skip += 1
            continue

        # Check if already in <head>
        head_end = content.find('</head>')
        marker_pos = content.find(MARKER)
        if marker_pos < head_end:
            print(f"  [skip] {fname} (already in head)")
            skip += 1
            continue

        # Find snippet block: from \n// === to \n</body>
        start = content.rfind('\n', 0, marker_pos)  # newline before marker
        end = content.find('\n</body>', marker_pos)

        if start == -1 or end == -1:
            print(f"  [miss] {fname} (bounds not found)")
            continue

        snippet_block = content[start:end]

        # Remove from before </body>
        content = content[:start] + content[end:]

        # Insert as <script> before </head>
        content = content.replace(
            '</head>',
            f'<script>{snippet_block}\n</script>\n</head>',
            1
        )

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  [OK]  {fname}")
        ok += 1

print(f"\nDone! {ok} fixed, {skip} skipped.")
