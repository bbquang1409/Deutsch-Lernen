/* KlassenLive · eigener Bestätigungsdialog (statt Browser-Dialog) */
function klConfirm(title,text,okLabel,danger){
  return new Promise(res=>{
    const o=document.createElement('div');o.className='kl-ov';
    o.innerHTML='<div class="kl-dlg" role="dialog" aria-modal="true"><h2></h2><p></p><div class="kl-act"><button type="button" class="btn ghost kl-no">Abbrechen</button><button type="button" class="btn kl-yes"></button></div></div>';
    o.querySelector('h2').textContent=title;o.querySelector('p').textContent=text||'';
    const y=o.querySelector('.kl-yes');y.textContent=okLabel||'OK';if(danger)y.classList.add('danger');
    const done=v=>{document.removeEventListener('keydown',kd);o.remove();res(v)};
    const kd=e=>{if(e.key==='Escape')done(false)};
    document.addEventListener('keydown',kd);
    o.querySelector('.kl-no').onclick=()=>done(false);y.onclick=()=>done(true);
    o.addEventListener('click',e=>{if(e.target===o)done(false)});
    document.body.append(o);y.focus();
  });
}
