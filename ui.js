/* Presentation preferences only. No changes to board data or drawing engine. */
(()=>{
  const key='quadro-ui-theme-v031';
  const root=document.documentElement;
  const btn=document.getElementById('uiThemeBtn');
  const choices=['auto','light','dark'];
  let current=localStorage.getItem(key)||'auto';
  if(!choices.includes(current))current='auto';
  function update(){
    if(current==='auto')root.removeAttribute('data-ui-theme');
    else root.dataset.uiTheme=current;
    const labels={auto:'Automático',light:'Claro',dark:'Escuro'};
    const symbols={auto:'◐',light:'☀',dark:'☾'};
    btn.textContent=symbols[current];
    btn.title='Tema da interface: '+labels[current]+' (clicar para alternar)';
    btn.setAttribute('aria-label',btn.title);
  }
  btn.addEventListener('click',()=>{current=choices[(choices.indexOf(current)+1)%choices.length];localStorage.setItem(key,current);update()});
  update();
})();
