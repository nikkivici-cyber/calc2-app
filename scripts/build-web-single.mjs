// Builds the web version as ONE self-contained HTML file (JS, CSS, KaTeX fonts and
// images inlined), so it can be opened or hosted anywhere without a server setup.
//   node scripts/build-web-single.mjs   →   dist-single/index.html
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
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

mkdirSync('dist-single', { recursive: true });
writeFileSync('dist-single/index.html', html);
console.log(`dist-single/index.html (${(html.length / 1024).toFixed(0)} KB)`);
