// Builds the web version as ONE self-contained HTML file (JS, CSS, KaTeX fonts and
// images inlined), plus home-screen icons and a web app manifest, so it can be hosted
// anywhere as static files (Netlify uses this via netlify.toml).
//   node scripts/build-web-single.mjs   →   dist-single/
import { execSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const OUT = 'dist';
execSync(`npx expo export -p web --output-dir ${OUT} --clear`, { stdio: 'inherit' });

const dataUri = (file, mime) => `data:${mime};base64,${readFileSync(file).toString('base64')}`;
const katexDir = dirname(require.resolve('katex/dist/katex.min.css'));

let html = readFileSync(join(OUT, 'index.html'), 'utf8');

// Inline stylesheets; KaTeX's fonts are referenced relatively and not copied by the export.
html = html.replace(/<link rel="preload"[^>]*>/g, '').replace(/<link rel="icon"[^>]*>/g, '');
html = html.replace(/<link rel="stylesheet" href="([^"]+)"\s*\/?>/g, (_, href) => {
  let css = readFileSync(join(OUT, href), 'utf8');
  css = css.replace(/,\s*url\("fonts\/[^"]+\.(woff|ttf)"\) format\("(woff|truetype)"\)/g, '');
  css = css.replace(/url\("fonts\/([^"]+\.woff2)"\)/g, (_m, f) => `url("${dataUri(join(katexDir, 'fonts', f), 'font/woff2')}")`);
  return `<style>${css}</style>`;
});

// Inline scripts, turning absolute image asset paths into data URIs.
html = html.replace(/<script src="([^"]+)"[^>]*><\/script>/g, (_, src) => {
  let js = readFileSync(join(OUT, src), 'utf8');
  js = js.replace(/"(\/assets\/[^"]+\.png)"/g, (m, p) =>
    existsSync(join(OUT, p)) ? JSON.stringify(dataUri(join(OUT, p), 'image/png')) : m,
  );
  return `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`;
});

// Home-screen ("Add to Home Screen") support: icon, full-screen launch, web app manifest.
const APP_NAME = 'Calc II Daily';
const THEME = '#4F46E5';
html = html.replace(
  '</head>',
  [
    `<link rel="apple-touch-icon" href="apple-touch-icon.png">`,
    `<link rel="icon" type="image/png" href="icon-192.png">`,
    `<link rel="manifest" href="manifest.webmanifest">`,
    `<meta name="apple-mobile-web-app-capable" content="yes">`,
    `<meta name="mobile-web-app-capable" content="yes">`,
    `<meta name="apple-mobile-web-app-status-bar-style" content="default">`,
    `<meta name="apple-mobile-web-app-title" content="${APP_NAME}">`,
    `<meta name="theme-color" content="${THEME}">`,
    '</head>',
  ].join('\n'),
);

mkdirSync('dist-single', { recursive: true });
writeFileSync('dist-single/index.html', html);
for (const icon of ['apple-touch-icon.png', 'icon-192.png', 'icon-512.png']) {
  copyFileSync(join('assets/web', icon), join('dist-single', icon));
}
writeFileSync(
  'dist-single/manifest.webmanifest',
  JSON.stringify(
    {
      name: APP_NAME,
      short_name: APP_NAME,
      start_url: '/',
      display: 'standalone',
      background_color: '#F5F7FA',
      theme_color: THEME,
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ),
);
console.log(`dist-single/index.html (${(html.length / 1024).toFixed(0)} KB)`);
