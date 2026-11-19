/* KlassenLive Bridge v1 — standalone-safe, no Supabase credentials. */
(function (global) {
  'use strict';
  const VERSION = 1;
  const CHANNEL = 'KLASSENLIVE_V1';
  const listeners = new Map();
  let session = null;
  let submitted = false;
  let deadlineTimer = null;
  const embedded = global.parent !== global;
  const params = new URLSearchParams(global.location.search);
  const configuredOrigin = params.get('kl_origin');
  const parentOrigin = configuredOrigin || (document.referrer ? new URL(document.referrer).origin : null);
  // Explicit origin is mandatory for embedded mode. No wildcard postMessage.
  const connected = embedded && !!parentOrigin && parentOrigin !== 'null';
  function emit(event, payload) { (listeners.get(event) || []).forEach(fn => { try { fn(payload); } catch (e) { console.error(e); } }); }
  function send(type, data) {
    if (!connected) return false;
    global.parent.postMessage({ channel: CHANNEL, version: VERSION, type, data: data || {} }, parentOrigin);
    return true;
  }
  function finish() {
    if (submitted) return;
    submitted = true;
    emit('submit-request', { reason: 'deadline' });
  }
  function scheduleDeadline() {
    clearTimeout(deadlineTimer);
    if (!session || !session.endsAt) return;
    const ms = new Date(session.endsAt).getTime() - Date.now();
    if (!Number.isFinite(ms)) return;
    if (ms <= 0) finish();
    else deadlineTimer = setTimeout(finish, Math.min(ms, 2147483647));
  }
  global.addEventListener('message', function (event) {
    if (!connected || event.source !== global.parent || event.origin !== parentOrigin) return;
    const msg = event.data;
    if (!msg || msg.channel !== CHANNEL || msg.version !== VERSION || typeof msg.type !== 'string') return;
    if (msg.type === 'INIT') {
      if (!msg.data || typeof msg.data.sessionId !== 'string' || !msg.data.sessionId) return;
      session = { sessionId: msg.data.sessionId, endsAt: msg.data.endsAt || null, mode: msg.data.mode || 'test' };
      submitted = false;
      scheduleDeadline();
      emit('init', { ...session });
      send('READY', { sessionId: session.sessionId });
    } else if (session && msg.data && msg.data.sessionId === session.sessionId) {
      if (msg.type === 'START') emit('start', msg.data);
      if (msg.type === 'LOCK' || msg.type === 'SUBMIT') finish();
      if (msg.type === 'OPEN_SENTENCE') emit('open-sentence', msg.data);
      if (msg.type === 'CLOSE_SENTENCE') emit('close-sentence', msg.data);
      if (msg.type === 'RELEASE_FEEDBACK') emit('release-feedback', msg.data);
    }
  });
  const api = {
    version: VERSION,
    connected,
    on(event, fn) {
      if (typeof fn !== 'function') throw new TypeError('Callback required');
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(fn);
      return () => listeners.set(event, (listeners.get(event) || []).filter(x => x !== fn));
    },
    progress(data) { return send('PROGRESS', { sessionId: session && session.sessionId, ...data }); },
    sentence(data) { return send('SENTENCE_SUBMITTED', { sessionId: session && session.sessionId, ...data }); },
    submit(data) {
      if (submitted && data && data.reason !== 'deadline') return false;
      submitted = true;
      return send('SUBMITTED', { sessionId: session && session.sessionId, ...data });
    },
    result(data) { return send('RESULT', { sessionId: session && session.sessionId, ...data }); },
    getSession() { return session && { ...session }; }
  };
  global.KlassenLive = Object.freeze(api);
  send('HELLO', { version: VERSION });
})(window);
