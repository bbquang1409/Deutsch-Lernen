#!/usr/bin/env python3
"""Hören & Diktat – Mini-Server (nur Python-Standardbibliothek, kein pip, keine KI nötig).
Doppelklick auf start.bat (Windows) / start.command (Mac) oder:  python start.py
- Liefert die Seite aus (mit Audio-Spulen/Range-Unterstützung)
- Liest assets/lessons/*.json bei JEDEM Aufruf neu  → neue Datei ablegen + F5, fertig
- Nimmt neue Lektionen direkt aus der Seite entgegen (Button „Speichern“), schreibt mp3 + json in assets/
"""
import http.server, socketserver, json, os, re, glob, sys, webbrowser, threading, mimetypes
ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", 8000))

def bundle():
    items = []
    for f in sorted(glob.glob(os.path.join(ROOT, "assets", "lessons", "*.json"))):
        try:
            d = json.load(open(f, encoding="utf8"))
            d.setdefault("questions", []); d.setdefault("level", "A1-A2"); d.setdefault("tag", "Geschichte"); d.setdefault("order", 9999)
            items.append(d)
        except Exception as e:
            print("⚠️ Datei übersprungen (JSON-Fehler):", os.path.basename(f), e)
    items.sort(key=lambda d: (d["order"], d["id"]))
    return ("window.HD_LESSONS = " + json.dumps(items, ensure_ascii=False) + ";\n").encode("utf8")

class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def _send(self, code, body=b"", ctype="text/plain; charset=utf-8", extra=None):
        self.send_response(code); self.send_header("Content-Type", ctype); self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        for k, v in (extra or {}).items(): self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD": self.wfile.write(body)
    def do_HEAD(self): self.do_GET()
    def do_GET(self):
        path = self.path.split("?")[0]
        if path == "/api/ping": return self._send(200, b"ok")
        if path == "/assets/lessons.js": return self._send(200, bundle(), "application/javascript; charset=utf-8")
        if path == "/": path = "/index.html"
        fp = os.path.normpath(os.path.join(ROOT, path.lstrip("/")))
        if not fp.startswith(ROOT) or not os.path.isfile(fp): return self._send(404, b"not found")
        size = os.path.getsize(fp); ctype = mimetypes.guess_type(fp)[0] or "application/octet-stream"
        rng = self.headers.get("Range"); start, end, code = 0, size - 1, 200; extra = {"Accept-Ranges": "bytes"}
        if rng:
            m = re.match(r"bytes=(\d*)-(\d*)", rng)
            if m:
                if m.group(1): start = int(m.group(1))
                if m.group(2): end = min(int(m.group(2)), size - 1)
                if not m.group(1) and m.group(2): start = max(0, size - int(m.group(2))); end = size - 1
                code = 206; extra["Content-Range"] = "bytes %d-%d/%d" % (start, end, size)
        with open(fp, "rb") as f:
            f.seek(start); data = f.read(end - start + 1)
        self._send(code, data, ctype, extra)
    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0)); body = self.rfile.read(n); path, _, qs = self.path.partition("?")
        try:
            if path == "/api/audio":
                name = os.path.basename(dict(p.split("=", 1) for p in qs.split("&") if "=" in p).get("name", "")); name = __import__("urllib.parse", fromlist=["x"]).unquote(name)
                name = os.path.basename(name)
                if not re.match(r"^[\w.\- äöüÄÖÜß]+\.(mp3|m4a|ogg|wav)$", name): return self._send(400, b"bad name")
                os.makedirs(os.path.join(ROOT, "assets", "audio"), exist_ok=True)
                open(os.path.join(ROOT, "assets", "audio", name), "wb").write(body); return self._send(200, b"ok")
            if path == "/api/lesson":
                d = json.loads(body.decode("utf8"))
                if not re.match(r"^[a-z0-9äöüß\-]+$", d.get("id", "")): return self._send(400, b"bad id")
                os.makedirs(os.path.join(ROOT, "assets", "lessons"), exist_ok=True)
                if "order" not in d:
                    d["order"] = len(glob.glob(os.path.join(ROOT, "assets", "lessons", "*.json"))) + 1
                json.dump(d, open(os.path.join(ROOT, "assets", "lessons", d["id"] + ".json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
                return self._send(200, b"ok")
        except Exception as e:
            return self._send(500, str(e).encode())
        self._send(404, b"nope")

class S(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True; allow_reuse_address = True

if __name__ == "__main__":
    srv = None
    for p in range(PORT, PORT + 20):
        try: srv = S(("127.0.0.1", p), H); PORT = p; break
        except OSError: continue
    if not srv: sys.exit("Kein freier Port gefunden.")
    url = "http://localhost:%d/" % PORT
    print("Hören & Diktat läuft:", url, " (Fenster offen lassen; Strg+C beendet)")
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try: srv.serve_forever()
    except KeyboardInterrupt: pass
