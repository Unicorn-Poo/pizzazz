import { createElement, ArrowUpRight, Copy, Play, RotateCcw } from 'lucide';
import { addPizzazz, createClickEffect } from '../src/index.js';
import { initialState, buildSnippet, getOptions, updateSizeRange, copyText } from './config.js';

const iconNodes = { 'arrow-up-right': ArrowUpRight, copy: Copy, play: Play, 'rotate-ccw': RotateCcw };
for (const placeholder of document.querySelectorAll('[data-lucide]')) {
  const icon = createElement(iconNodes[placeholder.dataset.lucide], { 'aria-hidden': 'true', focusable: 'false', class: 'lucide lucide-' + placeholder.dataset.lucide });
  placeholder.replaceWith(icon);
}
const byId = id => document.getElementById(id);
const presets = ['valentines', 'celebration', 'stars', 'snow', 'fire', 'confetti', 'bubbles', 'ghost', 'balloon', 'bat', 'pumpkin', 'egg', 'bunny'];
const labels = { valentines: 'Hearts', celebration: 'Celebrate' };
const state = { ...initialState, sizeRange: [...initialState.sizeRange] };
const stageButton = byId('tryEffect');
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
let cleanup;

for (const name of presets) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.effect = name;
  button.textContent = labels[name] || name;
  button.addEventListener('click', () => {
    state.effectType = name;
    state.character = '';
    syncControls();
  });
  byId('effectGrid').appendChild(button);
}

function render() {
  cleanup?.();
  // The demonstration uses the package implementation, never an inlined fork.
  cleanup = addPizzazz(stageButton, { ...getOptions(state), ...state, sizeRange: [...state.sizeRange] });
  for (const button of byId('effectGrid').querySelectorAll('button')) button.setAttribute('aria-pressed', String(!state.character && button.dataset.effect === state.effectType));
  for (const button of byId('triggers').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.trigger === state.trigger));
  byId('codeBlock').textContent = buildSnippet(state);
  byId('modeLabel').textContent = state.trigger === 'hover' ? 'Hover mode' : 'Click mode';
  byId('stageHint').textContent = state.trigger === 'hover'
    ? 'Move over the button, or press Enter to try one burst.'
    : 'Click, tap, or focus the button and press Enter.';
  byId('previewDescription').textContent = state.character
    ? 'Your custom particle, with your settings.'
    : `${labels[state.effectType] || state.effectType[0].toUpperCase() + state.effectType.slice(1)}, with your settings.`;
  byId('motionNote').hidden = !media.matches;
  for (const [id, value, unit] of [['count', state.count, ''], ['spread', state.spread, ' px'], ['duration', state.duration, ' ms'], ['minSize', state.sizeRange[0], ' px'], ['maxSize', state.sizeRange[1], ' px']]) {
    byId(id + 'Value').value = value.toLocaleString('en-GB') + unit;
  }
}
function syncControls() {
  for (const key of ['count', 'spread', 'duration', 'character', 'easing']) byId(key === 'character' ? 'customChar' : key).value = state[key];
  byId('minSize').value = state.sizeRange[0];
  byId('maxSize').value = state.sizeRange[1];
  for (const key of ['gravity', 'rotate']) byId(key).checked = state[key];
  render();
}
for (const id of ['count', 'spread', 'duration']) byId(id).addEventListener('input', event => { state[id] = Number(event.target.value); render(); });
for (const [id, index] of [['minSize', 0], ['maxSize', 1]]) byId(id).addEventListener('input', event => {
  state.sizeRange = updateSizeRange(state.sizeRange, index, Number(event.target.value));
  // A crossed endpoint moves its neighbour rather than generating an invalid range.
  byId('minSize').value = state.sizeRange[0];
  byId('maxSize').value = state.sizeRange[1];
  render();
});
for (const id of ['gravity', 'rotate']) byId(id).addEventListener('change', event => { state[id] = event.target.checked; render(); });
byId('easing').addEventListener('change', event => { state.easing = event.target.value; render(); });
byId('customChar').addEventListener('input', event => { state.character = event.target.value; render(); });
for (const button of byId('triggers').querySelectorAll('button')) button.addEventListener('click', () => { state.trigger = button.dataset.trigger; render(); });
// Native activation remains a keyboard/touch alternative to pointer-only hover.
stageButton.addEventListener('click', event => { if (state.trigger === 'hover') createClickEffect(event, state); });
byId('reset').addEventListener('click', () => { Object.assign(state, initialState, { sizeRange: [...initialState.sizeRange] }); syncControls(); byId('copyStatus').textContent = 'Settings reset.'; });
async function copy(button, text, success) {
  button.setAttribute('aria-busy', 'true');
  const copied = await copyText(text);
  byId('copyStatus').textContent = copied ? success : 'Copy was unavailable. Select the text and copy it manually.';
  button.removeAttribute('aria-busy');
}
byId('copyCode').addEventListener('click', event => copy(event.currentTarget, buildSnippet(state), 'Code copied. Make something playful.'));
byId('copyInstall').addEventListener('click', event => copy(event.currentTarget, 'npm install @unicorn-poo/pizzazz', 'Install command copied.'));
media.addEventListener('change', render);
window.addEventListener('pagehide', () => { cleanup?.(); media.removeEventListener('change', render); }, { once: true });
syncControls();
