/* ===========================================
   DEUTSCH-LERNEN · assets/dl-core.js
   Shared Google Sign-In & result logging helper.
   Usage:
   <script src="../../assets/dl-core.js" data-file="Training Wortschatz C1 (B)"></script>
   =========================================== */
(function () {
  const GOOGLE_CLIENT_ID = "565949426173-cg9jat7abv9jbk2hktuak1sud8pc11do.apps.googleusercontent.com";
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbw7uN5J6WwDG2vl5SgcpeeJ_ZnXDEaXLh-49VzYhQV11baq0pklFJEdhT660frW1kVS/exec";

  const scriptTag = document.currentScript;
  const DL_FILE = (scriptTag && scriptTag.dataset.file) || document.title || "Unbenannt";

  let dlUser = null;
  try {
    const s = localStorage.getItem('dl_user');
    if (s) dlUser = JSON.parse(s);
  } catch (e) {}

  let gsiReady = false;
  const gsi = document.createElement('script');
  gsi.src = "https://accounts.google.com/gsi/client";
  gsi.async = true;
  gsi.defer = true;
  gsi.onload = function () { gsiReady = true; };
  document.head.appendChild(gsi);

  function startLogin() {
    if (!gsiReady || !window.google || !window.google.accounts) {
      alert('Google Login lädt noch — bitte in 1 Sekunde erneut klicken.');
      return;
    }
    window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'profile email',
      callback: onToken
    }).requestAccessToken();
  }

  function onToken(token) {
    if (!token || !token.access_token) return;
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: 'Bearer ' + token.access_token }
    })
      .then(function (r) { return r.json(); })
      .then(function (p) {
        if (!p || !p.email) return;
        dlUser = {
          name: String(p.name || ''),
          email: String(p.email || ''),
          picture: typeof p.picture === 'string' && p.picture.startsWith('https://') ? p.picture : ''
        };
        try { localStorage.setItem('dl_user', JSON.stringify(dlUser)); } catch (e) {}
        renderBar();
      })
      .catch(function () {});
  }

  function logout() {
    dlUser = null;
    try { localStorage.removeItem('dl_user'); } catch (e) {}
    renderBar();
  }

  window._dlLog = function (setName, score, total) {
    if (!dlUser) return;
    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        name: dlUser.name,
        email: dlUser.email,
        file: DL_FILE,
        set: setName,
        score: score,
        total: total
      })
    }).catch(function () {});
  };
  window._dlUser = function () { return dlUser; };
  window._dlLogin = startLogin;
  window._dlLogout = logout;

  function renderBar() {
    let bar = document.getElementById('dl-topbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'dl-topbar';
      bar.style.cssText =
        "position:sticky;top:0;z-index:99999;display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:6px 14px;background:#fffefb;border-bottom:1px solid #ecd9b3;font-family:'Outfit',system-ui,-apple-system,sans-serif;font-size:12px;box-sizing:border-box;width:100%";
      document.body.prepend(bar);
    }
    while (bar.firstChild) bar.removeChild(bar.firstChild);

    if (dlUser) {
      if (dlUser.picture) {
        const img = document.createElement('img');
        img.src = dlUser.picture;
        img.alt = '';
        img.referrerPolicy = 'no-referrer';
        img.style.cssText = 'width:20px;height:20px;border-radius:50%;object-fit:cover';
        bar.appendChild(img);
      }
      const nameSpan = document.createElement('span');
      nameSpan.style.cssText = 'font-weight:700;color:#5b6478';
      nameSpan.textContent = dlUser.name || dlUser.email;
      bar.appendChild(nameSpan);

      const btnOut = document.createElement('button');
      btnOut.type = 'button';
      btnOut.textContent = 'Abmelden';
      btnOut.style.cssText =
        'background:none;border:1px solid #e4e7f0;border-radius:99px;padding:3px 10px;font-size:11px;font-weight:700;color:#98a0b3;cursor:pointer';
      btnOut.addEventListener('click', logout);
      bar.appendChild(btnOut);
    } else {
      const btnIn = document.createElement('button');
      btnIn.type = 'button';
      btnIn.textContent = 'Mit Google anmelden';
      btnIn.style.cssText =
        'background:#b8863b;color:#fff;border:none;border-radius:99px;padding:5px 14px;font-size:11.5px;font-weight:700;cursor:pointer';
      btnIn.addEventListener('click', startLogin);
      bar.appendChild(btnIn);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBar);
  } else {
    renderBar();
  }
})();
