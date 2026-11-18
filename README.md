# Quadro V0.3.4 — Ecrã completo e modo sem distrações

Base: V0.3.3.2, incluindo cabeçalho compacto, painel de quadros, toolbar responsive e design Minimalista Premium.

## Novidades
- Botão ◫ no cabeçalho: ativa/desativa o modo sem distrações.
- No modo sem distrações, o cabeçalho, painel lateral, dicas e ferramentas ficam ocultos, libertando o canvas.
- Controlos compactos: Ferramentas (mostrar/ocultar), Ecrã completo e Sair.
- Tecla `F` alterna o modo sem distrações (fora dos campos de texto); `Esc` sai.
- O botão ⛶ mantém a Fullscreen API do browser; o modo sem distrações também funciona quando o browser não permite fullscreen.
- Sem alterações ao `app.js` e ao formato de armazenamento. Compatível com GitHub Pages e funcionamento offline após carregar a página.

## Testes sugeridos
1. Desenhar e guardar; ativar modo sem distrações e continuar a desenhar.
2. Mostrar e ocultar ferramentas; testar touch e zoom com dois dedos.
3. Entrar e sair do ecrã completo e usar `Esc`.
4. Reduzir janela e testar tablet/telemóvel; confirmar que os quadros existentes continuam disponíveis na mesma origem.

**Nota:** em browsers móveis, a Fullscreen API pode não estar disponível; o modo sem distrações continua a funcionar.
