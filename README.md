# cristiancm.com

Site minimalista com 11ty + Vercel.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse `http://localhost:8080`

## Build

```bash
npm run build
```

Gera arquivos estáticos em `_site/`

## Deploy no Vercel

1. Push para GitHub
2. Conecte o repo no Vercel
3. Vercel detecta 11ty automaticamente
4. Pronto!

## Estrutura

- `index.html` - Página inicial
- `style.css` - Estilos
- `.eleventy.js` - Config do 11ty
- `package.json` - Dependências
