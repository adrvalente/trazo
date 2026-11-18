/* V0.3.4: apenas apresentação e Fullscreen API */
(()=>{
 const body=document.body,focus=document.getElementById('focusBtn'),exit=document.getElementById('focusExitBtn'),tools=document.getElementById('focusToolsBtn'),full=document.getElementById('fullBtn'),miniFull=document.getElementById('focusFullscreenBtn');
 function setFocus(on){body.classList.toggle('focus-mode',on);if(!on)body.classList.remove('focus-tools-open');focus.setAttribute('aria-pressed',String(on));focus.title=on?'Sair do modo sem distrações (F)':'Modo sem distrações (F)';tools.setAttribute('aria-pressed',String(body.classList.contains('focus-tools-open')));tools.textContent='✎ Ferramentas';}
 function setTools(){const open=body.classList.toggle('focus-tools-open');tools.setAttribute('aria-pressed',String(open));tools.textContent=open?'✕ Ocultar ferramentas':'✎ Ferramentas';}
 async function toggleFullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen?.()}catch(e){console.warn('Ecrã completo não disponível:',e)}}
 // O botão original já tem um handler no app.js. O controlo compacto reutiliza-o.
 miniFull.addEventListener('click',()=>full.click());
 focus.addEventListener('click',()=>setFocus(!body.classList.contains('focus-mode')));
 exit.addEventListener('click',()=>setFocus(false));
 tools.addEventListener('click',setTools);
 document.addEventListener('keydown',e=>{const t=e.target;if(t?.closest?.('input,textarea,select,[contenteditable="true"]')||document.querySelector('dialog[open]'))return;
 if(e.key.toLowerCase()==='f'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();setFocus(!body.classList.contains('focus-mode'))}
 if(e.key==='Escape'&&body.classList.contains('focus-mode')){setFocus(false)}
 });
 document.addEventListener('fullscreenchange',()=>{const on=!!document.fullscreenElement;full.setAttribute('aria-pressed',String(on));miniFull.setAttribute('aria-pressed',String(on));miniFull.title=on?'Sair do ecrã completo':'Ativar ecrã completo'});
})();
