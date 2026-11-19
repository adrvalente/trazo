/* V0.3.5.10 — ocultação inicial do cabeçalho, com logótipo sempre acessível. */
(()=>{
 const btn=document.getElementById('topbarToggle'),header=document.getElementById('topbar');
 if(!btn||!header)return;
 let timer=null,fadeTimer=null,autoPending=true;
 const clear=()=>{clearTimeout(timer);clearTimeout(fadeTimer);document.body.classList.remove('topbar-auto-fade')};
 function setVisible(visible){clear();document.body.classList.toggle('topbar-hidden',!visible);btn.setAttribute('aria-expanded',String(visible));btn.setAttribute('aria-label',visible?'Ocultar barra superior':'Mostrar barra superior');btn.title=visible?'Ocultar barra superior':'Mostrar barra superior';}
 function hideAutomatically(){if(!autoPending||document.body.classList.contains('topbar-hidden'))return;document.body.classList.add('topbar-auto-fade');fadeTimer=setTimeout(()=>{if(autoPending)setVisible(false)},300)}
 timer=setTimeout(hideAutomatically,5000);
 btn.addEventListener('click',()=>{autoPending=false;setVisible(document.body.classList.contains('topbar-hidden'))});
 // Se o utilizador interagir com a barra durante a introdução, não a ocultar a meio da tarefa.
 header.addEventListener('pointerdown',()=>{autoPending=false;clear()},{once:true});
 header.addEventListener('focusin',()=>{autoPending=false;clear()},{once:true});
})();
