/* DeutschKompass real 3D (three.js, bundled locally – works offline):
   - DK.bg3d()        floating letter tiles behind the whole UI (mouse + scroll parallax)
   - DK.compass(el)   interactive 3D compass, needle follows the pointer
   - DK.medal(el,pct) spinning 3D coin for the result screen                       */
(function () {
  if (!window.THREE || !window.DK) return;
  const T = THREE, DK = window.DK;
  const dark = () => matchMedia('(prefers-color-scheme: dark)').matches;
  const PAL = () => dark()
    ? { tile: 0xff4d5e, tile2: 0xffc84d, tile3: 0xff8a4c, ink: '#3a050c', light: 0xffd9d0 }
    : { tile: 0xd7263d, tile2: 0xffb830, tile3: 0xff6b4a, ink: '#ffffff', light: 0xffffff };
  let ok = null;
  function webgl() {
    if (ok !== null) return ok;
    try { const c = document.createElement('canvas'); ok = !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { ok = false; }
    return ok;
  }
  function makeRenderer(canvas, alpha = true) {
    const r = new T.WebGLRenderer({ canvas, alpha, antialias: true, powerPreference: 'low-power' });
    r.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    if (T.SRGBColorSpace) r.outputColorSpace = T.SRGBColorSpace;
    return r;
  }
  function textTexture(txt, { size = 256, color = '#fff', font = '900 150px Inter, Segoe UI, system-ui, sans-serif', bg = null } = {}) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const g = c.getContext('2d');
    if (bg) { g.fillStyle = bg; g.fillRect(0, 0, size, size); }
    g.fillStyle = color; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
    String(txt).split('\n').forEach((line, i, a) => g.fillText(line, size / 2, size / 2 + (i - (a.length - 1) / 2) * size * .34));
    const t = new T.CanvasTexture(c); if (T.SRGBColorSpace) t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
  }
  function roundedRect(w, h, r) {
    const s = new T.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
  }
  const tileGeo = () => { const g = new T.ExtrudeGeometry(roundedRect(1.6, 1.6, .28), { depth: .34, bevelEnabled: true, bevelSize: .07, bevelThickness: .07, bevelSegments: 4, curveSegments: 10 }); g.translate(0, 0, -.17); return g; };
  const dispose = o => o.traverse(n => { n.geometry?.dispose?.(); [].concat(n.material || []).forEach(m => { m.map?.dispose?.(); m.dispose?.(); }); });
  const live = [];
  DK.stop3d = () => { while (live.length) live.pop()(); };

  /* ---------------------------------------------------------------- background */
  DK.bg3d = function () {
    if (!webgl() || document.querySelector('canvas.bg3d')) return;
    const canvas = document.createElement('canvas'); canvas.className = 'bg3d'; canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const r = makeRenderer(canvas), scene = new T.Scene();
    const cam = new T.PerspectiveCamera(42, 1, .1, 100); cam.position.set(0, 0, 14);
    scene.add(new T.HemisphereLight(0xffffff, 0x662233, 1.15));
    const key = new T.DirectionalLight(0xffffff, 2.1); key.position.set(4, 7, 9); scene.add(key);
    const rim = new T.PointLight(0xffb02e, 60, 40); rim.position.set(-8, -3, 4); scene.add(rim);
    const geo = tileGeo();
    const LET = ['Ä', 'Ö', 'Ü', 'ß', 'A1', 'DE', '?', '!', 'Ja', 'Hallo', 'der', 'die', 'das', 'Du'];
    const items = [];
    function build() {
      items.forEach(i => { scene.remove(i.g); dispose(i.g); }); items.length = 0;
      const p = PAL(), narrow = innerWidth < 700, n = narrow ? 8 : 14, cols = [p.tile, p.tile2, p.tile3];
      for (let k = 0; k < n; k++) {
        const col = cols[k % 3];
        const body = new T.Mesh(geo, new T.MeshStandardMaterial({ color: col, roughness: .38, metalness: .12 }));
        const face = new T.CanvasTexture(textTexture(LET[k % LET.length], { color: k % 3 === 1 ? '#3b2600' : p.ink, font: `900 ${LET[k % LET.length].length > 2 ? 96 : 150}px Inter, Segoe UI, system-ui, sans-serif` }).image);
        const fm = new T.MeshBasicMaterial({ map: face, transparent: true, depthWrite: false, opacity: .95 });
        const f1 = new T.Mesh(new T.PlaneGeometry(1.35, 1.35), fm); f1.position.z = .245;
        const f2 = f1.clone(); f2.position.z = -.245; f2.rotation.y = Math.PI;
        const g = new T.Group(); g.add(body, f1, f2);
        const side = k % 2 ? 1 : -1, z = -15 + Math.random() * 8, sc = .55 + Math.random() * .6;
        const halfW = Math.tan(21 * Math.PI / 180) * (14 - z) * (innerWidth / innerHeight);
        const x = side * (halfW * (.7 + Math.random() * .3)) * (narrow ? .95 : 1);
        const y = (Math.random() - .5) * 2 * Math.tan(21 * Math.PI / 180) * (14 - z) * 1.5;
        g.position.set(x, y, z); g.scale.setScalar(sc); g.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        g.userData = { x, y, z, sc, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, ph: Math.random() * 6.28, sp: .15 + Math.random() * .3 };
        scene.add(g); items.push({ g });
      }
    }
    function size() { r.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); }
    size(); build();
    addEventListener('resize', () => { size(); build(); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', build);
    let mx = 0, my = 0, sy = scrollY, vel = 0, last = scrollY;
    addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
    document.body.classList.add('has3d');
    const clock = new T.Clock(); let run = true, raf = 0;
    document.addEventListener('visibilitychange', () => { run = !document.hidden; if (run) loop(); });
    function loop() {
      if (!run) return; raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime(), dy = scrollY - last; last = scrollY; vel = vel * .9 + dy * .02;
      cam.position.x += (mx * 1.6 - cam.position.x) * .04;
      cam.position.y += ((-scrollY * .004 - my * 1.0) - cam.position.y) * .06;
      cam.lookAt(cam.position.x * .3, cam.position.y * .6, 0);
      items.forEach(({ g }) => {
        const u = g.userData; if (DK.reduce) return;
        g.rotation.x += u.vx * .01 + vel * .02; g.rotation.y += u.vy * .01 + u.sp * .006;
        g.position.y = u.y + Math.sin(t * u.sp + u.ph) * .5;
      });
      r.render(scene, cam);
    }
    if (DK.reduce) { r.render(scene, cam); } else loop();
  };

  /* ------------------------------------------------------------------ compass */
  DK.compass = function (host) {
    if (!webgl() || !host) return false;
    const canvas = document.createElement('canvas'); canvas.className = 'gl-canvas'; host.appendChild(canvas);
    const r = makeRenderer(canvas), scene = new T.Scene();
    const cam = new T.PerspectiveCamera(32, 1, .1, 50); cam.position.set(0, 0, 9);
    scene.add(new T.HemisphereLight(0xffffff, 0x552233, 1.3));
    const key = new T.DirectionalLight(0xffffff, 2.4); key.position.set(3, 5, 8); scene.add(key);
    const gold = new T.PointLight(0xffc04d, 40, 30); gold.position.set(-5, -2, 5); scene.add(gold);
    const grp = new T.Group(); scene.add(grp);
    const rot = new T.Group(); rot.rotation.x = Math.PI / 2; grp.add(rot);               // cylinders stand on Z axis
    const base = new T.Mesh(new T.CylinderGeometry(2.1, 2.3, .5, 64), new T.MeshStandardMaterial({ color: 0xffb02e, metalness: .55, roughness: .28 })); rot.add(base);
    const faceTex = (() => {
      const s = 512, c = document.createElement('canvas'); c.width = c.height = s; const g = c.getContext('2d');
      const gr = g.createRadialGradient(s / 2, s / 2, 20, s / 2, s / 2, s / 2); gr.addColorStop(0, '#fffdf8'); gr.addColorStop(1, '#f7d6cc');
      g.fillStyle = gr; g.beginPath(); g.arc(s / 2, s / 2, s / 2, 0, 7); g.fill();
      g.strokeStyle = '#a3122a'; g.lineWidth = 3;
      for (let i = 0; i < 72; i++) { const a = i / 72 * 6.283, l = i % 9 === 0 ? 38 : i % 3 === 0 ? 24 : 12; g.beginPath(); g.moveTo(s / 2 + Math.cos(a) * (s / 2 - 14), s / 2 + Math.sin(a) * (s / 2 - 14)); g.lineTo(s / 2 + Math.cos(a) * (s / 2 - 14 - l), s / 2 + Math.sin(a) * (s / 2 - 14 - l)); g.stroke(); }
      g.fillStyle = '#2b0c12'; g.font = '900 64px Inter, Segoe UI, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      [['N', 0, -1], ['O', 1, 0], ['S', 0, 1], ['W', -1, 0]].forEach(([l, x, y]) => g.fillText(l, s / 2 + x * 168, s / 2 + y * 168));
      g.fillStyle = '#d7263d'; g.font = '900 54px Inter, Segoe UI, sans-serif'; g.fillText('A1+', s / 2, s / 2 + 92);
      const t = new T.CanvasTexture(c); if (T.SRGBColorSpace) t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8; return t;
    })();
    const face = new T.Mesh(new T.CircleGeometry(1.95, 64), new T.MeshStandardMaterial({ map: faceTex, roughness: .5, metalness: 0 }));
    face.position.z = .27; grp.add(face);
    face.rotation.x = 0; base.rotation.x = 0;                // face is already in XY plane
    rot.rotation.x = Math.PI / 2;
    const ring = new T.Mesh(new T.TorusGeometry(2.08, .13, 20, 80), new T.MeshStandardMaterial({ color: 0xfff1c9, metalness: .75, roughness: .2 })); ring.position.z = .27; grp.add(ring);
    const needle = new T.Group(); needle.position.z = .5; grp.add(needle);
    const nN = new T.Mesh(new T.ConeGeometry(.26, 1.7, 4), new T.MeshStandardMaterial({ color: 0xd7263d, roughness: .3, metalness: .2 })); nN.position.y = .85; needle.add(nN);
    const nS = new T.Mesh(new T.ConeGeometry(.26, 1.4, 4), new T.MeshStandardMaterial({ color: 0xeef5f4, roughness: .3, metalness: .2 })); nS.position.y = -.7; nS.rotation.z = Math.PI; needle.add(nS);
    const pin = new T.Mesh(new T.SphereGeometry(.2, 24, 16), new T.MeshStandardMaterial({ color: 0xffb02e, metalness: .8, roughness: .2 })); pin.position.z = .5; grp.add(pin);
    grp.rotation.x = -.55; grp.rotation.y = .35;

    function size() { const w = host.clientWidth || 200, h = host.clientHeight || 200; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    size(); new ResizeObserver(size).observe(host);
    let tx = 0, ty = 0, ang = 0, vel = 0, target = 0, spin = 0;
    addEventListener('pointermove', e => {
      const b = host.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      tx = Math.max(-1, Math.min(1, (e.clientX - cx) / innerWidth * 2)); ty = Math.max(-1, Math.min(1, (e.clientY - cy) / innerHeight * 2));
      target = Math.atan2(e.clientX - cx, -(e.clientY - cy));
    }, { passive: true });
    host.addEventListener('pointerdown', () => { spin = 14; });
    const clock = new T.Clock(); let run = true;
    document.addEventListener('visibilitychange', () => { run = !document.hidden; if (run) loop(); });
    live.push(() => { run = false; });
    function loop() {
      if (!run) return; requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      // spring needle -> pointer direction (needle points along +Y, rotates around Z; negative sign = clockwise)
      let diff = Math.atan2(Math.sin(-target - ang), Math.cos(-target - ang));
      vel += diff * .09; vel *= .86; vel += spin * .01; spin *= .94; ang += vel; needle.rotation.z = ang;
      grp.rotation.y += ((.35 + tx * .55) - grp.rotation.y) * .06; grp.rotation.x += ((-.55 + ty * .35) - grp.rotation.x) * .06;
      grp.position.y = Math.sin(t * 1.3) * .08;
      r.render(scene, cam);
    }
    if (DK.reduce) { r.render(scene, cam); } else loop();
    return true;
  };

  /* -------------------------------------------------------------------- medal */
  DK.medal = function (host, pct) {
    if (!webgl() || !host) return false;
    const canvas = document.createElement('canvas'); canvas.className = 'gl-canvas'; host.appendChild(canvas);
    const r = makeRenderer(canvas), scene = new T.Scene();
    const cam = new T.PerspectiveCamera(30, 1, .1, 50); cam.position.set(0, 0, 8.5);
    scene.add(new T.HemisphereLight(0xffffff, 0x443322, 1.4));
    const key = new T.DirectionalLight(0xffffff, 2.6); key.position.set(3, 4, 7); scene.add(key);
    const warm = new T.PointLight(0xffc04d, 35, 30); warm.position.set(-4, -2, 4); scene.add(warm);
    const tier = pct === 100 ? { c: 0xffc233, e: 0xff9a1f, label: '★' } : pct >= 80 ? { c: 0xdfe7ea, e: 0x9fb3bb, label: '✓' } : pct >= 50 ? { c: 0xd9945a, e: 0xa5662e, label: '' } : { c: 0x8fa3aa, e: 0x61767d, label: '' };
    const coin = new T.Group(); scene.add(coin);
    const rot = new T.Group(); rot.rotation.x = Math.PI / 2; coin.add(rot);
    const body = new T.Mesh(new T.CylinderGeometry(1.5, 1.5, .34, 64), new T.MeshStandardMaterial({ color: tier.c, metalness: .7, roughness: .26 })); rot.add(body);
    const rim = new T.Mesh(new T.TorusGeometry(1.5, .12, 20, 80), new T.MeshStandardMaterial({ color: tier.e, metalness: .8, roughness: .22 }));
    const rimB = rim.clone(); rim.position.z = .17; rimB.position.z = -.17; coin.add(rim, rimB);
    const tex = textTexture(pct + '%\n' + tier.label, { size: 512, color: '#4a2f00', font: '900 150px Inter, Segoe UI, sans-serif' });
    const mk = z => { const m = new T.Mesh(new T.CircleGeometry(1.3, 48), new T.MeshBasicMaterial({ map: tex, transparent: true })); m.position.z = z; return m; };
    const fr = mk(.2), bk = mk(-.2); bk.rotation.y = Math.PI; coin.add(fr, bk);
    function size() { const w = host.clientWidth || 120, h = host.clientHeight || 120; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    size(); new ResizeObserver(size).observe(host);
    const clock = new T.Clock(); let run = true, drop = 1;
    live.push(() => { run = false; r.dispose(); canvas.remove(); });
    (function loop() {
      if (!run) return; requestAnimationFrame(loop); const t = clock.getElapsedTime();
      drop += (0 - drop) * .08; coin.position.y = drop * 4 + Math.sin(t * 2) * .07;
      coin.rotation.y = DK.reduce ? .4 : t * 1.6; coin.rotation.x = .12; r.render(scene, cam);
    })();
    return true;
  };

  /* background tiles removed (kept function DK.bg3d for optional use) */
})();
