/* KlassenLive Bridge v1.1 — independent HTML; no Supabase credentials. */
(function (global) {
  'use strict';
  const VERSION = 1, CHANNEL = 'KLASSENLIVE_V1';
  const listeners = new Map();
  const embedded = global.parent !== global;
  const params = new URLSearchParams(global.location.search);
  const configuredOrigin = params.get('kl_origin');
  let parentOrigin = configuredOrigin || null;
  if (!parentOrigin && document.referrer) { try { parentOrigin = new URL(document.referrer).origin; } catch (_) {} }
  const connected = embedded && !!parentOrigin && parentOrigin !== 'null';
  let session = null, submitted = false, started = false, timer = null;
  const emit = (event, payload) => (listeners.get(event) || []).forEach(fn => { try { fn(payload); } catch (err) { console.error(err); } });
  function send(type, data = {}) {
    if (!connected) return false;
    global.parent.postMessage({ channel: CHANNEL, version: VERSION, type, data }, parentOrigin);
    return true;
  }
  function remaining() { return session && session.endsAt ? Math.max(0, new Date(session.endsAt).getTime() - Date.now()) : null; }
  function stopTimer() { if (timer !== null) clearInterval(timer); timer = null; }
  function tick() {
    if (!started || submitted) return;
    const ms = remaining();
    emit('tick', { remainingMs: ms, endsAt: session.endsAt });
    if (ms !== null && ms <= 0) requestSubmit('deadline');
  }
  function requestSubmit(reason) {
    if (submitted) return;
    // The exercise grades the current answer and calls submit().
    emit('submit-request', { reason });
    // Fallback for an exercise that failed to respond: close its session.
    if (!submitted) {
      submitted = true; started = false; stopTimer();
      emit('locked', { reason });
      send('SUBMITTED', { sessionId: session.sessionId, reason, answers: [], correct: null, total: null, error: 'exercise_did_not_submit' });
    }
  }
  global.addEventListener('message', event => {
    if (!connected || event.source !== global.parent || event.origin !== parentOrigin) return;
    const msg = event.data;
    if (!msg || msg.channel !== CHANNEL || msg.version !== VERSION || typeof msg.type !== 'string') return;
    if (msg.type === 'INIT') {
      if (!msg.data || typeof msg.data.sessionId !== 'string' || !msg.data.sessionId) return;
      if (session && session.sessionId === msg.data.sessionId) {
        // Updating deadline must never reopen an already submitted attempt.
        if (!submitted && msg.data.endsAt !== undefined) session.endsAt = msg.data.endsAt;
        emit('init', { ...session });
        if (started) tick();
      } else {
        stopTimer();
        session = { sessionId: msg.data.sessionId, endsAt: msg.data.endsAt || null, mode: msg.data.mode || 'test' };
        submitted = false; started = false;
        emit('init', { ...session });
      }
      send('READY', { sessionId: session.sessionId });
      return;
    }
    if (!session || !msg.data || msg.data.sessionId !== session.sessionId) return;
    if (msg.type === 'START' && !submitted) {
      started = true;
      emit('start', { ...session });
      stopTimer(); timer = setInterval(tick, 250); tick();
    } else if ((msg.type === 'LOCK' || msg.type === 'SUBMIT') && !submitted) requestSubmit(msg.type === 'LOCK' ? 'locked' : 'teacher');
    else if (msg.type === 'OPEN_SENTENCE') emit('open-sentence', msg.data);
    else if (msg.type === 'CLOSE_SENTENCE') emit('close-sentence', msg.data);
    else if (msg.type === 'RELEASE_FEEDBACK') emit('release-feedback', msg.data);
  });
  global.KlassenLive = Object.freeze({
    version: VERSION, connected,
    on(event, fn) {
      if (typeof fn !== 'function') throw new TypeError('Callback required');
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(fn);
      return () => listeners.set(event, (listeners.get(event) || []).filter(x => x !== fn));
    },
    progress(data = {}) { if (!session || submitted) return false; return send('PROGRESS', { sessionId: session.sessionId, ...data }); },
    sentence(data = {}) { if (!session || submitted) return false; return send('SENTENCE_SUBMITTED', { sessionId: session.sessionId, ...data }); },
    submit(data = {}) {
      if (submitted) return false;
      submitted = true; started = false; stopTimer();
      emit('locked', { reason: data.reason || 'manual' });
      return send('SUBMITTED', { ...data, sessionId: session && session.sessionId });
    },
    result(data = {}) { if (!submitted) return false; return send('RESULT', { ...data, sessionId: session && session.sessionId }); },
    getSession() { return session && { ...session }; },
    isSubmitted() { return submitted; }
  });
  send('HELLO', { version: VERSION });
})(window);
