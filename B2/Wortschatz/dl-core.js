/* ===========================================
   DEUTSCH-LERNEN · dl-core.js
   1 file dùng chung cho toàn bộ site (Grammatik, Wortschatz, …).
   Sửa Sheet URL / Client ID / logic login → sửa đúng 1 chỗ này.

   Cách dùng trong mỗi file bài tập:
   <script src="/assets/dl-core.js" data-file="Tên bài tập của bạn (B2)"></script>

   Trong code bài tập, gọi y hệt trước giờ:
   _dlLog('Tên bộ câu hỏi', diemDung, tongCau);
=========================================== */
(function () {
  const GOOGLE_CLIENT_ID = "565949426173-cg9jat7abv9jbk2hktuak1sud8pc11do.apps.googleusercontent.com";
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbw7uN5J6WwDG2vl5SgcpeeJ_ZnXDEaXLh-49VzYhQV11baq0pklFJEdhT660frW1kVS/exec";

  const scriptTag = document.currentScript;
  const DL_FILE = (scriptTag && scriptTag.dataset.file) || document.title || "Unbenannt";

  let dlUser = null;
  try { const s = localStorage.getItem('dl_user'); if (s) dlUser = JSON.parse(s); } catch (e) {}

  /* ---- Google Identity Services dynamisch laden ---- */
  let gsiReady = false;
  const gsi = document.createElement('script');
  gsi.src = "https://accounts.google.com/gsi/client";
  gsi.async = true; gsi.defer = true;
  gsi.onload = function () { gsiReady = true; };
  document.head.appendChild(gsi);

  function startLogin() {
    if (!gsiReady || !window.google) {
      alert('Google Login lädt noch — bitte in 1 Sekunde erneut klicken.');
      return;
    }
    google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'profile email',
      callback: onToken
    }).requestAccessToken();
  }

  function onToken(token) {
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: 'Bearer ' + token.access_token }
    }).then(r => r.json()).then(p => {
      dlUser = { name: p.name, email: p.email, picture: p.picture };
      localStorage.setItem('dl_user', JSON.stringify(dlUser));
      renderBar();
    });
  }

  function logout() {
    dlUser = null;
    localStorage.removeItem('dl_user');
    renderBar();
  }

  /* ---- öffentliche API (gleiche Signatur wie bisher) ---- */
  window._dlLog = function (setName, score, total) {
    if (!dlUser) return;
    fetch(SHEET_URL, {
      method: 'POST', mode: 'no-cors',
      body: JSON.stringify({ name: dlUser.name, email: dlUser.email, file: DL_FILE, set: setName, score: score, total: total })
    }).catch(function () {});
  };
  window._dlUser = function () { return dlUser; };
  window._dlLogin = startLogin;
  window._dlLogout = logout;

  /* ---- Mini-Topbar: Login-Status auf JEDER Seite sichtbar ---- */
  function renderBar() {
    let bar = document.getElementById('dl-topbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'dl-topbar';
      bar.style.cssText = "position:sticky;top:0;z-index:99999;display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:6px 14px;background:#fffefb;border-bottom:1px solid #ecd9b3;font-family:'Outfit',system-ui,-apple-system,sans-serif;font-size:12px;box-sizing:border-box;width:100%";
      document.body.prepend(bar);
    }
    if (dlUser) {
      bar.innerHTML =
        '<img src="' + dlUser.picture + '" style="width:20px;height:20px;border-radius:50%">' +
        '<span style="font-weight:700;color:#5b6478">' + dlUser.name + '</span>' +
        '<button onclick="_dlLogout()" style="background:none;border:1px solid #e4e7f0;border-radius:99px;padding:3px 10px;font-size:11px;font-weight:700;color:#98a0b3;cursor:pointer">Abmelden</button>';
    } else {
      bar.innerHTML =
        '<button onclick="_dlLogin()" style="background:#b8863b;color:#fff;border:none;border-radius:99px;padding:5px 14px;font-size:11.5px;font-weight:700;cursor:pointer">Mit Google anmelden</button>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBar);
  } else {
    renderBar();
  }
})();
