#!/usr/bin/env python3
"""Gom tất cả assets/lessons/*.json thành assets/lessons.js (index.html đọc file này).
Chạy lại mỗi khi thêm/sửa bài:   python tools/sync.py
Chỉ dùng thư viện chuẩn, không cần cài gì."""
import json, glob, os, sys
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
items = []
missing = []
for f in sorted(glob.glob(os.path.join(root, "assets", "lessons", "*.json"))):
    try:
        d = json.load(open(f, encoding="utf8"))
    except Exception as e:
        print("LỖI JSON:", os.path.basename(f), e); sys.exit(1)
    for k in ("id", "title", "audio", "units"):
        if k not in d: print("Thiếu trường", k, "trong", os.path.basename(f)); sys.exit(1)
    if not os.path.exists(os.path.join(root, d["audio"])):
        missing.append(d["audio"])
    d.setdefault("questions", []); d.setdefault("level", "A1-A2"); d.setdefault("tag", "Geschichte"); d.setdefault("order", 9999)
    items.append(d)
items.sort(key=lambda d: (d["order"], d["id"]))
open(os.path.join(root, "assets", "lessons.js"), "w", encoding="utf8").write(
    "/* Tự sinh bởi tools/sync.py – đừng sửa tay. Sửa các file trong assets/lessons/*.json */\nwindow.HD_LESSONS = "
    + json.dumps(items, ensure_ascii=False) + ";\n")
if missing: print("⚠️ Chưa thấy %d file audio trong assets/audio/ (ví dụ: %s)" % (len(missing), missing[0]))
print("OK:", len(items), "bài ->", "assets/lessons.js")
