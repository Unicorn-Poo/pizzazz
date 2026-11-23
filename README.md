# Pizzazz

A small JavaScript library for decorative click and hover particles. No runtime dependencies.

[Live Demo](https://pizzazz-demo.vercel.app)

## Features

- 13 built-in effect types (hearts, confetti, stars, snow, fire, etc.)
- Custom character/emoji support
- Gravity, rotation, spread, and easing options
- Click or hover trigger modes with throttle support
- Cleanup function for easy listener removal
- Lightweight and framework-agnostic
- Fully TypeScript-compatible with proper type declarations
- Works seamlessly with Next.js

## Installation

### Using npm

```sh
npm install @unicorn-poo/pizzazz
```

### Using a module CDN

```html
<script type="module">
  import { addPizzazz } from 'https://cdn.jsdelivr.net/npm/@unicorn-poo/pizzazz/dist/index.js';
  const cleanup = addPizzazz(document, { effectType: 'stars' });
</script>
```

## Usage

### Basic

```javascript
import { addPizzazz } from '@unicorn-poo/pizzazz';

addPizzazz(document, { effectType: 'confetti', count: 10 });
```

### All options

```javascript
addPizzazz(document, {
  effectType: 'fire',       // 'valentines'|'celebration'|'stars'|'snow'|'fire'|'confetti'|'bubbles'|'ghost'|'balloon'|'bat'|'pumpkin'|'egg'|'bunny'
  character: '🍕',          // Custom character (overrides effectType)
  count: 12,                // Number of particles per event (default: 8)
  sizeRange: [10, 40],      // Min/max font size in px (default: [10, 30])
  duration: 1500,           // Animation duration in ms (default: 1000)
  spread: 60,               // How far particles travel in px (default: 40)
  gravity: true,            // Particles arc downward (default: false)
  rotate: true,             // Particles spin (default: false)
  easing: 'bounce',         // 'ease-out'|'bounce'|'spring'|'gentle'|'ease-in-out' (default: 'ease-out')
  trigger: 'hover',         // 'click'|'hover' (default: 'click')
  throttle: 200,            // Throttle interval for hover in ms (default: 200)
});
```

### Targeting specific elements

```javascript
const button = document.getElementById('special-button');
const cleanup = addPizzazz(button, { effectType: 'celebration' });

// Later, remove the listener
cleanup();
```

### Next.js / React

```javascript
"use client";
import { useEffect } from 'react';
import { addPizzazz } from '@unicorn-poo/pizzazz';

export default function ClickEffects() {
  useEffect(() => {
    const cleanup = addPizzazz(document, {
      effectType: 'confetti',
      count: 10,
      gravity: true,
      easing: 'spring',
    });
    return cleanup;
  }, []);

  return null;
}
```

### Motion and accessibility

Effects are skipped when the visitor has `prefers-reduced-motion: reduce` set, and particles are hidden from assistive technology because they are decorative. Keyboard activation (Enter or Space on a button) bursts from the centre of the element.

## Development

```sh
git clone https://github.com/unicorn-poo/pizzazz.git
cd pizzazz
npm install
npm test
npm run build
```

## License

MIT
