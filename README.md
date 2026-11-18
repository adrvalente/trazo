# Quadro V0.2 — Touch & Notes

Aplicação web estática (HTML, CSS e JavaScript) para desenhar e tomar notas em dispositivos touch.

## Testar

Abre `index.html` num browser moderno ou publica os ficheiros na raiz de um repositório com GitHub Pages (Settings > Pages > Deploy from a branch > main / root).

## Novidades V0.2

- Notas adesivas e caixas de texto: seleciona a ferramenta e toca no quadro; no modo Mão, toca para editar ou arrasta para mover.
- Formas: retângulo, elipse e linha.
- Fundos: pontilhado, liso, quadriculado e pautado; temas claro e escuro.
- Exportação PNG, backup JSON e importação JSON.
- Menu de quadros acessível em tablets e telemóveis.
- Migração automática dos quadros da V0.1 guardados no mesmo domínio e browser.

## Limitações atuais

- Ainda sem login nem sincronização; os dados são guardados em localStorage no dispositivo.
- Desfazer/refazer abrange criação de elementos e traços; alterações a notas existentes e movimentos não entram no histórico.
- Exportação PNG usa fundo liso e recorta ao conteúdo; o padrão de fundo não é incluído.
- Importar backup substitui os quadros existentes: exporta primeiro um backup.
- Desenho com dedo e caneta; rejeição de palma depende do dispositivo/browser.
- Sem service worker: para uso offline é necessário que os ficheiros estejam disponíveis localmente.
