# Quadro V0.1

Protótipo de quadro digital, pensado para ecrãs táteis e GitHub Pages.

## Testar

Abra `index.html` num browser moderno. Para publicar no GitHub Pages, coloque os três ficheiros na raiz do repositório e ative Pages (Deploy from a branch).

## Funcionalidades

- Desenho com dedo, rato ou caneta digital (Pointer Events)
- Caneta, marcador, borracha e mão para mover
- Cores e espessura ajustável
- Pinch-to-zoom com dois dedos
- Desfazer/refazer e limpar com confirmação
- Vários quadros com nomes editáveis
- Gravação automática no `localStorage` do browser
- Exportação PNG e ecrã completo

## Limitações V0.1

Ainda não inclui login, sincronização cloud, notas de texto nem colaboração. Os quadros ficam apenas no browser/dispositivo atual. Limpar os dados do site pode apagar os quadros. Recomenda-se exportar os desenhos importantes. O modo offline depende de o browser manter os recursos em cache; não existe ainda service worker.

## Próxima fase

Autenticação por email e palavra-passe com Supabase Auth, armazenamento por utilizador com RLS e sincronização cloud. Nunca guardar passwords no código do GitHub Pages.
