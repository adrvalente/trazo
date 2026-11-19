# Quadro V0.3.5.4 — Ferramentas avançadas

Base: Quadro V0.3.5.2, com todas as funcionalidades anteriores e alojamento estático em GitHub Pages.

## Novidades
- **Inserir imagem (▧):** PNG/JPG/WebP até 2 MB; a imagem é reduzida para 900 px no maior lado e armazenada no quadro como JPEG. Seleciona-a para mover, redimensionar, duplicar, bloquear e ordenar.
- **Conta-gotas (♧):** escolhe a cor de um traço ou forma existente, tocando no elemento.
- **Grelha magnética (⊞):** ao ativar, objetos movidos com a ferramenta Selecionar alinham-se em incrementos de 24 px. Também se aplica à inserção de imagens.

## Atenção
- As imagens aumentam significativamente o tamanho dos backups e do armazenamento local; exporta backups JSON regularmente. O browser pode impor limites de espaço.
- A grelha magnética aplica-se ao movimento de objetos e à colocação inicial de imagens, não aos traços livres.
- Não foi adicionado login nem sincronização cloud. Essa funcionalidade continua reservada para `QuadroV0.4 GO`.
- Antes de substituir a versão anterior, exporta um backup JSON.

## Publicação
Publica todos os ficheiros desta pasta na raiz do repositório GitHub Pages. Não são necessários servidores nem build tools.
