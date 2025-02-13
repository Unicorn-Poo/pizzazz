# Pizzazz

A simple and customizable JavaScript library that adds animated effects to mouse clicks.

## 🚀 Features

- Supports multiple effect types (hearts, confetti, stars, snow, fire, etc.)
- Customizable effect count, size, and duration
- Lightweight and framework-agnostic
- Fully TypeScript-compatible with proper type declarations
- Works seamlessly with Next.js

## 📦 Installation

### Using npm

```sh
npm install @unicorn-poo/pizzazz
```

### Using CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@unicorn-poo/pizzazz/dist/index.js"></script>
```

## 🎨 Usage

### **Basic Usage**

```javascript
import { addPizzazz } from '@unicorn-poo/pizzazz';

addPizzazz(document, { effectType: 'confetti', count: 10, duration: 1200 });
```

### **Customizing Options**

```javascript
addPizzazz(document, {
  effectType: 'fire',  // Effect type ('valentines', 'stars', 'bubbles', etc.)
  count: 12,          // Number of elements per click
  sizeRange: [10, 40], // Randomized effect sizes
  duration: 1500      // Animation duration in milliseconds
});
```

### **Adding Effects to Specific Elements**

```javascript
const button = document.getElementById('special-button');
addPizzazz(button, { effectType: 'celebration' });
```

### Using addPizzazz with Next.js and useEffect (Type-Safe)

In Next.js, it is necessary to use useEffect because addPizzazz interacts with the browser’s DOM, which is only available on the client side. Without this, you may encounter errors due to server-side rendering (SSR).

```javascript
"use client";
import { useEffect } from 'react';
import addPizzazz from '@unicorn-poo/pizzazz';

export default function ClickEffectComponent() {
  useEffect(() => {
    addPizzazz(document, { effectType: 'confetti', count: 10 });
  }, []);

  return <div>🎉 Click anywhere for Pizzazz!</div>;
}
```

## 🛠 Development & Contribution

Clone the repo:

```sh
git clone https://github.com/unicorn-poo/pizzazz.git
cd pizzazz
npm install
```

Run tests:

```sh
npm test
```

Build the package:

```sh
npm run build
```

## 📜 License

MIT License. Feel free to use and contribute!
