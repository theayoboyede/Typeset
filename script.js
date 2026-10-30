'use strict';

/* ---------- font catalogue (Google Fonts) ---------- */
const W6 = [300, 400, 500, 600, 700, 800];
const FONTS = [
  // Sans serif
  { n: 'Inter', c: 'Sans serif', w: W6 },
  { n: 'Hanken Grotesk', c: 'Sans serif', w: W6 },
  { n: 'DM Sans', c: 'Sans serif', w: [300, 400, 500, 600, 700] },
  { n: 'Work Sans', c: 'Sans serif', w: W6 },
  { n: 'Manrope', c: 'Sans serif', w: W6 },
  { n: 'Outfit', c: 'Sans serif', w: W6 },
  { n: 'Sora', c: 'Sans serif', w: W6 },
  { n: 'Lexend', c: 'Sans serif', w: W6 },
  { n: 'Poppins', c: 'Sans serif', w: W6 },
  { n: 'Montserrat', c: 'Sans serif', w: W6 },
  { n: 'IBM Plex Sans', c: 'Sans serif', w: [300, 400, 500, 600, 700] },
  { n: 'Source Sans 3', c: 'Sans serif', w: W6 },
  { n: 'Nunito Sans', c: 'Sans serif', w: W6 },
  { n: 'Karla', c: 'Sans serif', w: W6 },
  { n: 'Urbanist', c: 'Sans serif', w: W6 },
  { n: 'Rubik', c: 'Sans serif', w: W6 },
  { n: 'Epilogue', c: 'Sans serif', w: W6 },
  // Display
  { n: 'Bricolage Grotesque', c: 'Display', w: W6 },
  { n: 'Space Grotesk', c: 'Display', w: [300, 400, 500, 600, 700] },
  { n: 'Syne', c: 'Display', w: [400, 500, 600, 700, 800] },
  { n: 'Oswald', c: 'Display', w: [300, 400, 500, 600, 700] },
  { n: 'Archivo Black', c: 'Display', w: [400] },
  { n: 'Anton', c: 'Display', w: [400] },
  { n: 'Bebas Neue', c: 'Display', w: [400] },
  { n: 'Abril Fatface', c: 'Display', w: [400] },
  // Serif
  { n: 'Playfair Display', c: 'Serif', w: [400, 500, 600, 700, 800] },
  { n: 'Fraunces', c: 'Serif', w: W6 },
  { n: 'DM Serif Display', c: 'Serif', w: [400] },
  { n: 'Instrument Serif', c: 'Serif', w: [400] },
  { n: 'Libre Baskerville', c: 'Serif', w: [400, 700] },
  { n: 'Lora', c: 'Serif', w: [400, 500, 600, 700] },
  { n: 'Merriweather', c: 'Serif', w: [300, 400, 700] },
  { n: 'Roboto Slab', c: 'Serif', w: [300, 400, 500, 600, 700] },
  { n: 'Cormorant Garamond', c: 'Serif', w: [300, 400, 500, 600, 700] },
  { n: 'Crimson Pro', c: 'Serif', w: W6 },
  { n: 'Spectral', c: 'Serif', w: W6 },
  { n: 'Newsreader', c: 'Serif', w: W6 },
  // Mono
  { n: 'JetBrains Mono', c: 'Monospace', w: W6 },
  { n: 'IBM Plex Mono', c: 'Monospace', w: [300, 400, 500, 600, 700] }
];

const FALLBACK = { 'Sans serif': 'sans-serif', 'Display': 'sans-serif', 'Serif': 'serif', 'Monospace': 'monospace' };
const SERIF_DISPLAY = new Set(['Abril Fatface']);

const PRESETS = [
  { name: 'Editorial',  h: ['Playfair Display', 700], b: ['Source Sans 3', 400] },
  { name: 'Modern',     h: ['Bricolage Grotesque', 800], b: ['Hanken Grotesk', 400] },
  { name: 'Classic',    h: ['Libre Baskerville', 700], b: ['Karla', 400] },
  { name: 'Friendly',   h: ['DM Serif Display', 400], b: ['DM Sans', 400] },
  { name: 'Technical',  h: ['Space Grotesk', 700], b: ['IBM Plex Sans', 400] },
  { name: 'Bold',       h: ['Archivo Black', 400], b: ['Work Sans', 400] },
  { name: 'Soft',       h: ['Fraunces', 600], b: ['Nunito Sans', 400] },
  { name: 'Code-minded', h: ['JetBrains Mono', 700], b: ['Inter', 400] }
];

const FORMATS = [
  { id: 'css', label: 'CSS' },
  { id: 'html', label: 'HTML link' },
  { id: 'tw', label: 'Tailwind' }
];

const STORE_KEY = 'typeset:saved';

/* ---------- state ---------- */
const state = {
  h: 'Playfair Display', hw: 700,
  b: 'Source Sans 3', bw: 400,
  size: 18, ratio: 1.25, lh: 1.6, ls: -0.02,
  theme: 'light',
  text: 'Type with a point of view',
  format: 'css',
  lock: { h: false, b: false },
  saved: []
};

const $ = (id) => document.getElementById(id);
const el = {
  gf: $('gf'), sample: $('sample'), sH1: $('sH1'),
  hFont: $('hFont'), hWeight: $('hWeight'), hLock: $('hLock'),
  bFont: $('bFont'), bWeight: $('bWeight'), bLock: $('bLock'),
  size: $('size'), sizeOut: $('sizeOut'), ratio: $('ratio'),
  lh: $('lh'), lhOut: $('lhOut'), ls: $('ls'), lsOut: $('lsOut'),
  text: $('text'), themeLight: $('themeLight'), themeDark: $('themeDark'),
  presets: $('presets'), formats: $('formats'), code: $('code'), note: $('note'),
  shuffle: $('shuffle'), copy: $('copy'), save: $('save'), share: $('share'),
  toast: $('toast'), saved: $('saved'), emptySaved: $('emptySaved')
};

/* ---------- helpers ---------- */
const meta = (name) => FONTS.find((f) => f.n === name) || FONTS[0];
const stack = (name) => '"' + name + '", ' + FALLBACK[meta(name).c];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const nearest = (list, v) => list.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a), list[0]);
const num = (n, d) => String(+n.toFixed(d));
const rem = (px) => num(px / 16, 3) + 'rem';
const sizes = () => {
  const r = state.ratio, s = state.size;
  return { h1: s * Math.pow(r, 4), h2: s * Math.pow(r, 3), h3: s * Math.pow(r, 2), lede: s * r, body: s, small: s / r };
};

function googleUrl() {
  const map = new Map();
  [[state.h, state.hw], [state.b, state.bw]].forEach(([n, w]) => {
    if (!map.has(n)) map.set(n, new Set());
    map.get(n).add(w);
  });
  const fam = [];
  map.forEach((set, n) => {
    fam.push('family=' + n.replace(/ /g, '+') + ':wght@' + Array.from(set).sort((a, b) => a - b).join(';'));
  });
  return 'https://fonts.googleapis.com/css2?' + fam.join('&') + '&display=swap';
}

/* ---------- export ---------- */
function exportText() {
  const sz = sizes();
  const url = googleUrl();
  const ls = num(state.ls, 2) + 'em';
  if (state.format === 'html') {
    return '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
      + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
      + '<link href="' + url + '" rel="stylesheet">';
  }
  if (state.format === 'tw') {
    return '// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontFamily: {\n        heading: [' + JSON.stringify(state.h) + ', ' + JSON.stringify(FALLBACK[meta(state.h).c]) + '],\n        body: [' + JSON.stringify(state.b) + ', ' + JSON.stringify(FALLBACK[meta(state.b).c]) + ']\n      }\n    }\n  }\n};\n// usage: class="font-heading" and class="font-body"\n// load the fonts with the HTML link tab';
  }
  return '/* 1. Load the fonts */\n@import url("' + url + '");\n\n'
    + '/* 2. Use them */\n:root {\n  --font-heading: ' + stack(state.h) + ';\n  --font-body: ' + stack(state.b) + ';\n}\n\n'
    + 'body {\n  font-family: var(--font-body);\n  font-weight: ' + state.bw + ';\n  font-size: ' + rem(sz.body) + ';\n  line-height: ' + num(state.lh, 2) + ';\n}\n\n'
    + 'h1, h2, h3 {\n  font-family: var(--font-heading);\n  font-weight: ' + state.hw + ';\n  letter-spacing: ' + ls + ';\n  line-height: 1.12;\n}\n\n'
    + 'h1 { font-size: ' + rem(sz.h1) + '; }\nh2 { font-size: ' + rem(sz.h2) + '; }\nh3 { font-size: ' + rem(sz.h3) + '; }\n'
    + 'small { font-size: ' + rem(sz.small) + '; }';
}

/* ---------- pairing note ---------- */
function pairingNote() {
  if (state.h === state.b) return 'Same font for both. It is safe and consistent. Try a different body font for more contrast.';
  const a = meta(state.h).c, b = meta(state.b).c;
  const serif = (c, n) => c === 'Serif' || SERIF_DISPLAY.has(n);
  const aS = serif(a, state.h), bS = serif(b, state.b);
  if (aS !== bS) return 'A serif and a sans together: a classic contrast. Keep the weights close to what each font does best.';
  if (a === 'Monospace' || b === 'Monospace') return 'A monospace voice gives the page a technical edge. Use it for headings and keep the body easy to read.';
  if (aS && bS) return 'Two serifs can fight each other. If it feels busy, switch one of them to a clean sans.';
  return 'Two sans serifs work when they differ in width or weight. If they look too alike, make the headline bolder or choose a display face.';
}

/* ---------- render ---------- */
function fillWeights(sel, font, current) {
  const list = meta(font).w;
  sel.textContent = '';
  list.forEach((w) => {
    const o = document.createElement('option');
    o.value = String(w);
    o.textContent = String(w);
    sel.appendChild(o);
  });
  const w = list.indexOf(current) >= 0 ? current : nearest(list, current);
  sel.value = String(w);
  return w;
}

function render() {
  // Keep weights valid for the chosen fonts before building the Google Fonts URL.
  state.hw = nearest(meta(state.h).w, state.hw);
  state.bw = nearest(meta(state.b).w, state.bw);

  const sz = sizes();

  const url = googleUrl();
  if (el.gf.getAttribute('href') !== url) el.gf.setAttribute('href', url);

  const s = el.sample.style;
  s.setProperty('--hf', stack(state.h));
  s.setProperty('--bf', stack(state.b));
  s.setProperty('--hw', state.hw);
  s.setProperty('--bw', state.bw);
  s.setProperty('--fs', num(sz.body, 1) + 'px');
  s.setProperty('--h1', num(sz.h1, 1) + 'px');
  s.setProperty('--h2', num(sz.h2, 1) + 'px');
  s.setProperty('--h3', num(sz.h3, 1) + 'px');
  s.setProperty('--lede', num(sz.lede, 1) + 'px');
  s.setProperty('--small', num(sz.small, 1) + 'px');
  s.setProperty('--lh', state.lh);
  s.setProperty('--ls', num(state.ls, 2) + 'em');
  el.sample.className = 'sample ' + state.theme;
  el.sH1.textContent = state.text || 'Type with a point of view';

  if (el.hFont.value !== state.h) el.hFont.value = state.h;
  if (el.bFont.value !== state.b) el.bFont.value = state.b;
  state.hw = fillWeights(el.hWeight, state.h, state.hw);
  state.bw = fillWeights(el.bWeight, state.b, state.bw);
  s.setProperty('--hw', state.hw);
  s.setProperty('--bw', state.bw);

  el.hLock.setAttribute('aria-pressed', String(state.lock.h));
  el.bLock.setAttribute('aria-pressed', String(state.lock.b));
  el.themeLight.setAttribute('aria-pressed', String(state.theme === 'light'));
  el.themeDark.setAttribute('aria-pressed', String(state.theme === 'dark'));

  el.size.value = state.size; el.sizeOut.textContent = state.size + ' px';
  el.lh.value = state.lh; el.lhOut.textContent = num(state.lh, 2);
  el.ls.value = state.ls; el.lsOut.textContent = num(state.ls, 2) + 'em';
  el.ratio.value = String(state.ratio);

  Array.from(el.presets.children).forEach((b, i) => {
    const p = PRESETS[i];
    b.setAttribute('aria-pressed', String(p.h[0] === state.h && p.h[1] === state.hw && p.b[0] === state.b && p.b[1] === state.bw));
  });
  Array.from(el.formats.children).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === state.format)));

  el.note.textContent = pairingNote();
  el.code.textContent = exportText();
  writeHash();
}

/* ---------- share link ---------- */
function hashString() {
  const p = new URLSearchParams();
  p.set('h', state.h + ':' + state.hw);
  p.set('b', state.b + ':' + state.bw);
  p.set('s', state.size);
  p.set('r', state.ratio);
  p.set('lh', state.lh);
  p.set('ls', state.ls);
  p.set('t', state.theme);
  return p.toString();
}

function writeHash() {
  try { history.replaceState(null, '', '#' + hashString()); } catch (e) { /* optional */ }
}

function readHash() {
  try {
    const p = new URLSearchParams(location.hash.slice(1));
    const pair = (k) => {
      const v = p.get(k);
      if (!v) return null;
      const i = v.lastIndexOf(':');
      const n = v.slice(0, i), w = Number(v.slice(i + 1));
      return FONTS.some((f) => f.n === n) && Number.isFinite(w) ? [n, w] : null;
    };
    const h = pair('h'), b = pair('b');
    if (h) { state.h = h[0]; state.hw = h[1]; }
    if (b) { state.b = b[0]; state.bw = b[1]; }
    const n = (k, a, z, d) => { const v = parseFloat(p.get(k)); return Number.isFinite(v) ? clamp(v, a, z) : d; };
    state.size = Math.round(n('s', 14, 22, state.size));
    const r = n('r', 1.125, 1.5, state.ratio);
    state.ratio = nearest([1.125, 1.2, 1.25, 1.333, 1.5], r);
    state.lh = n('lh', 1.3, 1.9, state.lh);
    state.ls = n('ls', -0.06, 0.04, state.ls);
    if (p.get('t') === 'dark') state.theme = 'dark';
  } catch (e) { /* ignore a bad hash */ }
}

/* ---------- actions ---------- */
function setPair(h, b) {
  state.h = h[0]; state.hw = h[1];
  state.b = b[0]; state.bw = b[1];
  render();
}

function shuffle() {
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const headPool = FONTS.filter((f) => f.c !== 'Monospace');
  const bodyPool = FONTS.filter((f) => f.c === 'Sans serif' || f.c === 'Serif');
  if (!state.lock.h) {
    const f = pick(headPool);
    state.h = f.n;
    state.hw = nearest(f.w, pick([500, 600, 700, 800]));
  }
  if (!state.lock.b) {
    let f = pick(bodyPool);
    for (let i = 0; i < 5 && f.n === state.h; i++) f = pick(bodyPool);
    state.b = f.n;
    state.bw = nearest(f.w, 400);
  }
  render();
}

let toastTimer = 0;
function toast(msg) {
  el.toast.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.toast.textContent = ''; }, 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (e2) { return false; }
  }
}

/* ---------- saved ---------- */
function loadSaved() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    if (Array.isArray(raw)) {
      state.saved = raw.filter((s) => s && FONTS.some((f) => f.n === s.h) && FONTS.some((f) => f.n === s.b) && Number.isFinite(s.hw) && Number.isFinite(s.bw)).slice(0, 12);
    }
  } catch (e) { state.saved = []; }
}
function persistSaved() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state.saved)); } catch (e) { /* unavailable */ }
}

function renderSaved() {
  el.saved.textContent = '';
  el.emptySaved.hidden = state.saved.length > 0;
  state.saved.forEach((s, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'sv';

    const load = document.createElement('button');
    load.type = 'button';
    load.className = 'load';
    load.setAttribute('aria-label', 'Load pairing: ' + s.h + ' with ' + s.b);
    const a = document.createElement('span'); a.className = 'a'; a.textContent = s.h + ' ' + s.hw;
    const b = document.createElement('span'); b.className = 'b'; b.textContent = s.b + ' ' + s.bw;
    load.append(a, b);
    load.addEventListener('click', () => setPair([s.h, s.hw], [s.b, s.bw]));

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'del';
    del.setAttribute('aria-label', 'Delete saved pairing: ' + s.h + ' with ' + s.b);
    del.textContent = '×';
    del.addEventListener('click', () => { state.saved.splice(i, 1); persistSaved(); renderSaved(); });

    wrap.append(load, del);
    el.saved.appendChild(wrap);
  });
}

/* ---------- init ---------- */
function buildSelects() {
  ['hFont', 'bFont'].forEach((id) => {
    const sel = el[id];
    const groups = {};
    FONTS.forEach((f) => {
      if (!groups[f.c]) {
        groups[f.c] = document.createElement('optgroup');
        groups[f.c].label = f.c;
        sel.appendChild(groups[f.c]);
      }
      const o = document.createElement('option');
      o.value = f.n;
      o.textContent = f.n;
      groups[f.c].appendChild(o);
    });
  });
}

function buildChips() {
  PRESETS.forEach((p) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = p.name;
    b.addEventListener('click', () => setPair(p.h, p.b));
    el.presets.appendChild(b);
  });
  FORMATS.forEach((f) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.id = f.id;
    b.textContent = f.label;
    b.addEventListener('click', () => { state.format = f.id; render(); });
    el.formats.appendChild(b);
  });
}

function init() {
  buildSelects();
  buildChips();
  readHash();
  loadSaved();

  el.hFont.addEventListener('change', () => { state.h = el.hFont.value; render(); });
  el.bFont.addEventListener('change', () => { state.b = el.bFont.value; render(); });
  el.hWeight.addEventListener('change', () => { state.hw = Number(el.hWeight.value); render(); });
  el.bWeight.addEventListener('change', () => { state.bw = Number(el.bWeight.value); render(); });
  el.hLock.addEventListener('click', () => { state.lock.h = !state.lock.h; render(); });
  el.bLock.addEventListener('click', () => { state.lock.b = !state.lock.b; render(); });

  el.size.addEventListener('input', () => { state.size = Number(el.size.value); render(); });
  el.ratio.addEventListener('change', () => { state.ratio = Number(el.ratio.value); render(); });
  el.lh.addEventListener('input', () => { state.lh = Number(el.lh.value); render(); });
  el.ls.addEventListener('input', () => { state.ls = Number(el.ls.value); render(); });
  el.text.addEventListener('input', () => { state.text = el.text.value; render(); });
  el.themeLight.addEventListener('click', () => { state.theme = 'light'; render(); });
  el.themeDark.addEventListener('click', () => { state.theme = 'dark'; render(); });

  el.shuffle.addEventListener('click', shuffle);
  el.copy.addEventListener('click', async () => {
    toast((await copyText(el.code.textContent)) ? 'Copied to clipboard' : 'Copy blocked, select the code instead');
  });
  el.share.addEventListener('click', async () => {
    toast((await copyText(location.href.split('#')[0] + '#' + hashString())) ? 'Share link copied' : 'Copy blocked, copy the address bar instead');
  });
  el.save.addEventListener('click', () => {
    const entry = { h: state.h, hw: state.hw, b: state.b, bw: state.bw };
    if (state.saved.some((s) => s.h === entry.h && s.hw === entry.hw && s.b === entry.b && s.bw === entry.bw)) { toast('Already saved'); return; }
    state.saved.unshift(entry);
    state.saved = state.saved.slice(0, 12);
    persistSaved();
    renderSaved();
    toast('Saved');
  });

  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space') return;
    const t = e.target;
    if (t.closest && t.closest('button, input, textarea, select, a')) return;
    e.preventDefault();
    shuffle();
  });

  window.addEventListener('hashchange', () => {
    if (location.hash.slice(1) === hashString()) return;
    readHash();
    render();
  });

  el.text.value = state.text;
  renderSaved();
  render();
}

init();
