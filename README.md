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


## Motion and input

Effects respect `prefers-reduced-motion: reduce` and are hidden from assistive technology because they are decorative. Native button activation works with Enter and Space; zero-coordinate keyboard activations are anchored at the target's centre. The attachment API returns a listener cleanup function. Existing particles finish their configured lifetime after listener cleanup.

The thirteen built-in glyphs and custom character are particle artwork, rather than interface icons. The demo uses named Lucide icons for its controls and textual preset names. The library itself has no runtime dependency on Lucide; Lucide and TypeScript are development dependencies for the demo build and quality checks.

## Local demonstration

`npm run build` builds both library formats and the demo from the same `src/index.js` implementation. Serve the repository as static files and open `demo/index.html`. The demo includes keyboard/touch activation, clipboard failure feedback, safely escaped configuration output and an ordered particle-size range. It does not call a backend or a provider.

`npm test` preserves the library's existing tests and includes the shared icon regressions plus keyboard, SSR, reduced-motion and snippet/clipboard cases. `npm run lint` enforces Lucide-only interface icons. The easing presets named bounce and spring are CSS cubic-bezier curves, not physical simulations. No fixed byte size, frame rate or broad browser compatibility claim is certified by this local pass.
