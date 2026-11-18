/* Quadro V0.3.5 — preferências de apresentação, isoladas dos dados do quadro. */
(()=>{
 'use strict';
 const KEY='quadro-ui-preferences-v035', LEGACY='quadro-ui-theme-v031';
 const defaults={theme:'auto',accent:'indigo',controls:'normal',tips:true,status:true,zoom:true};
 const allowed={theme:['auto','light','dark'],accent:['indigo','blue','teal','graphite'],controls:['normal','large']};
 let pref={...defaults};
 try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object'){
   for(const k of Object.keys(defaults)){if(typeof defaults[k]==='boolean'&&typeof saved[k]==='boolean')pref[k]=saved[k];else if(allowed[k]?.includes(saved[k]))pref[k]=saved[k];}
 }else{const old=localStorage.getItem(LEGACY);if(allowed.theme.includes(old))pref.theme=old;}}catch(e){console.warn('Preferências inválidas; serão usadas as predefinições.',e)}
 const $=id=>document.getElementById(id),root=document.documentElement;
 const dialog=$('settingsDialog'), theme=$('prefTheme'),controls=$('prefControls');
 function apply(){
   if(pref.theme==='auto')root.removeAttribute('data-ui-theme');else root.dataset.uiTheme=pref.theme;
   root.dataset.prefAccent=pref.accent;root.dataset.prefControls=pref.controls;
   root.dataset.prefTips=pref.tips?'on':'off';root.dataset.prefStatus=pref.status?'on':'off';root.dataset.prefZoom=pref.zoom?'on':'off';
   const themeButton=$('uiThemeBtn');if(themeButton){const symbols={auto:'◐',light:'☀',dark:'☾'},labels={auto:'Automático',light:'Claro',dark:'Escuro'};themeButton.textContent=symbols[pref.theme];themeButton.title='Tema da interface: '+labels[pref.theme];themeButton.setAttribute('aria-label',themeButton.title);}
   theme.value=pref.theme;controls.value=pref.controls;
   for(const k of ['tips','status','zoom'])$('pref'+k[0].toUpperCase()+k.slice(1)).checked=pref[k];
   document.querySelectorAll('[data-accent]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.accent===pref.accent)));
 }
 function save(){try{localStorage.setItem(KEY,JSON.stringify(pref));localStorage.setItem(LEGACY,pref.theme)}catch(e){console.warn('Não foi possível guardar preferências.',e)}apply()}
 // ui.js mantém o comportamento antigo; a preferência atual é a fonte de verdade.
 const oldTheme=$('uiThemeBtn');oldTheme?.addEventListener('click',()=>{pref.theme=['auto','light','dark'][(['auto','light','dark'].indexOf(pref.theme)+1)%3];save()});
 $('settingsBtn').addEventListener('click',()=>{apply();dialog.showModal()});
 $('settingsClose').addEventListener('click',()=>dialog.close());$('settingsDone').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 theme.addEventListener('change',()=>{pref.theme=theme.value;save()});controls.addEventListener('change',()=>{pref.controls=controls.value;save()});
 for(const k of ['tips','status','zoom'])$('pref'+k[0].toUpperCase()+k.slice(1)).addEventListener('change',e=>{pref[k]=e.target.checked;save()});
 document.querySelectorAll('[data-accent]').forEach(b=>b.addEventListener('click',()=>{pref.accent=b.dataset.accent;save()}));
 $('settingsReset').addEventListener('click',()=>{pref={...defaults};save()});
 apply();
})();
