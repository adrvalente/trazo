/* Quadro V0.3.5.4 — ferramentas avançadas; sem dependências externas. */
(()=>{'use strict';
const imageBtn=document.getElementById('insertImageBtn'),input=document.getElementById('imageInput'),snapBtn=document.getElementById('snapBtn');
imageBtn.addEventListener('click',()=>input.click());
snapBtn.addEventListener('click',()=>{window.quadroSnapEnabled=!window.quadroSnapEnabled;snapBtn.setAttribute('aria-pressed',String(window.quadroSnapEnabled));snapBtn.classList.toggle('selected',window.quadroSnapEnabled);snapBtn.title=window.quadroSnapEnabled?'Desativar alinhamento à grelha':'Ativar alinhamento à grelha de 24 px'});
input.addEventListener('change',async()=>{const file=input.files?.[0];input.value='';if(!file)return;
if(!['image/png','image/jpeg','image/webp'].includes(file.type)){alert('Escolhe uma imagem PNG, JPG ou WebP.');return}
if(file.size>2*1024*1024){alert('A imagem deve ter menos de 2 MB. Para evitar esgotar o armazenamento local, reduz a imagem antes de importar.');return}
try{const bitmap=await createImageBitmap(file);const scale=Math.min(1,900/bitmap.width,900/bitmap.height);const c=document.createElement('canvas');c.width=Math.max(1,Math.round(bitmap.width*scale));c.height=Math.max(1,Math.round(bitmap.height*scale));c.getContext('2d').drawImage(bitmap,0,0,c.width,c.height);bitmap.close?.();const src=c.toDataURL('image/jpeg',.76);if(src.length>1_500_000){alert('Imagem demasiado grande para o armazenamento local.');return}window.quadroAddImage(src,c.width,c.height);}catch(err){alert('Não foi possível inserir a imagem: '+err.message)}
});
})();
