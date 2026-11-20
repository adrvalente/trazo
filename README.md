# TRAZO V0.3.5.13 — Identidade Visual V1.0

Base: Quadro V0.3.5.12, com funcionalidades de desenho, zoom radial, ferramentas, armazenamento e exportações preservadas.

## Identidade
- Nome TRAZO, logótipo no cabeçalho e botão persistente.
- Favicon e ícones PWA (192, 512, Apple touch).
- Splash screen 1080×1920 sem indicador de carregamento, removido após o carregamento da página.
- Manifesto web para instalação compatível com GitHub Pages.

## Instalação
Publicar **o conteúdo desta pasta** na raiz do repositório GitHub Pages (ou na pasta publicada). Não é necessário backend.

## Compatibilidade dos dados
As chaves locais e o formato de backups `quadro-v03` foram mantidos intencionalmente para não perder os quadros existentes e permitir importar backups anteriores. Não renomear estas chaves.

## Nota sobre APK
A imagem `assets/splash-1080x1920.png` pode ser usada num ecrã de arranque próprio da APK. O splash nativo do Android 12+ usa regras de composição específicas.

## PWA
O manifesto permite instalar em browsers compatíveis. Para funcionamento offline após primeira visita, será necessário acrescentar um service worker numa versão futura.
