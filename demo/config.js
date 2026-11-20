export const initialState = {
  effectType: 'stars', character: '', count: 8, spread: 40, duration: 1000,
  sizeRange: [10, 30], gravity: false, rotate: false, easing: 'ease-out', trigger: 'click',
};

export function getOptions(state) {
  const options = {};
  if (state.character) options.character = state.character;
  else if (state.effectType !== 'valentines') options.effectType = state.effectType;
  for (const key of ['count', 'spread', 'duration']) {
    const defaultValue = { count: 8, spread: 40, duration: 1000 }[key];
    if (state[key] !== defaultValue) options[key] = state[key];
  }
  if (state.sizeRange[0] !== 10 || state.sizeRange[1] !== 30) options.sizeRange = [...state.sizeRange];
  for (const key of ['gravity', 'rotate']) if (state[key]) options[key] = true;
  if (state.easing !== 'ease-out') options.easing = state.easing;
  if (state.trigger !== 'click') options.trigger = state.trigger;
  return options;
}

export function buildSnippet(state) {
  const entries = Object.entries(getOptions(state));
  const options = entries.length ? ', {\n' + entries.map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`).join('\n') + '\n}' : '';
  return "import { addPizzazz } from '@unicorn-poo/pizzazz';\n\n" +
    `const cleanup = addPizzazz(document${options});\n\n// Call cleanup() when you remove the interaction.`;
}

export function updateSizeRange(range, index, value) {
  const next = [...range];
  next[index] = value;
  if (next[0] > next[1]) next[1 - index] = value;
  return next;
}

export async function copyText(text, clipboard = globalThis.navigator?.clipboard) {
  if (!clipboard?.writeText) return false;
  try { await clipboard.writeText(text); return true; } catch { return false; }
}
