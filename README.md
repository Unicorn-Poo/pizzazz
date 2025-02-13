# Pizzazz

A simple and customizable JavaScript library that adds animated effects to mouse clicks.

## 🚀 Features

- Supports multiple effect types (hearts, confetti, stars, snow, fire, etc.)
- Customizable effect count, size, and duration
- Lightweight and framework-agnostic

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
import { addPizzazz } from 'click-effects';

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
