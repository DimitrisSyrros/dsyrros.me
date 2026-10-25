// Renders public/og.jpg (1200×630 share image) from profile.json with headless Chrome.
// Usage: node scripts/og-image.mjs  (set CHROME=/path/to/chrome to override)
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = new URL('..', import.meta.url);
const profile = JSON.parse(readFileSync(new URL('src/data/profile.json', root), 'utf8'));
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// "Name | Senior Front-end Engineer (React.js, TypeScript)" -> role + stack
const [, rest = profile.seo.title] = profile.seo.title.split(' | ');
const [, role = rest, stack = ''] = rest.match(/^(.*?)\s*\((.*)\)$/) ?? [];
const [firstName, ...lastName] = profile.person.name.split(' ');

const tmp = mkdtempSync(join(tmpdir(), 'og-'));
const road = join(tmp, 'road.jpg');
await sharp(new URL('src/assets/hero/road.webp', root).pathname).resize(580).jpeg({ quality: 90 }).toFile(road);

const font = (f) => pathToFileURL(new URL(`public/fonts/${f}`, root).pathname).href;
const flaps = (word) => [...word.toUpperCase()].map((c) => (c === ' ' ? '<i class="gap"></i>' : `<b>${c}</b>`)).join('');
const words = role.split(' ');
const rows = [words[0], words.slice(1).join(' ')];

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: Anton; src: url(${font('anton-latin.woff2')}); }
@font-face { font-family: "Work Sans"; src: url(${font('work-sans-latin.woff2')}); }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; background: #0b0c0e; overflow: hidden; }
.photo { position: absolute; right: 0; top: 0; width: 580px; height: 648px; background: url(${pathToFileURL(road).href}) center top / cover;
  -webkit-mask-image: linear-gradient(to right, transparent 0, rgb(0 0 0 / .55) 9%, #000 22%); }
.copy { position: absolute; left: 72px; top: 64px; width: 620px; }
h1 { font: 400 150px/.86 Anton, sans-serif; color: #eceae6; text-transform: uppercase; letter-spacing: -.005em; }
.board { margin-top: 36px; display: grid; gap: 6px; }
.row { display: flex; gap: 3px; }
.row b, .row .gap { width: 27px; height: 40px; }
.row b { display: grid; place-items: center; border-radius: 3px; font: 600 24px/1 "Work Sans", sans-serif; color: #c6ff3d;
  background: linear-gradient(#232428 0 calc(50% - 1px), #0b0c0e calc(50% - 1px) calc(50% + 1px), #2a2b30 calc(50% + 1px)); }
p { margin-top: 28px; font: 500 30px/1.3 "Work Sans", sans-serif; color: #eceae6; }
</style>
<div class="photo"></div>
<div class="copy">
  <h1>${firstName}<br>${lastName.join(' ')}</h1>
  <div class="board" aria-hidden="true">${rows.map((r) => `<div class="row">${flaps(r)}</div>`).join('')}</div>
  <p>${stack.replace(', ', ' · ')}</p>
</div>`;

writeFileSync(join(tmp, 'og.html'), html);
const png = join(tmp, 'og.png');
execFileSync(chrome, ['--headless=new', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', `--screenshot=${png}`, '--virtual-time-budget=2000', pathToFileURL(join(tmp, 'og.html')).href], { stdio: 'ignore' });
await sharp(png).jpeg({ quality: 85, mozjpeg: true }).toFile(new URL('public/og.jpg', root).pathname);
rmSync(tmp, { recursive: true, force: true });
console.log('wrote public/og.jpg');
