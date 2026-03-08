const effects = {
  valentines: '❤️',
  celebration: '🎉',
  stars: '✨',
  snow: '❄️',
  fire: '🔥',
  confetti: '🎊',
  bubbles: '🫧',
  ghost: '👻',
  balloon: '🎈',
  bat: '🦇',
  pumpkin: '🎃',
  egg: '🥚',
  bunny: '🐰',
};

const easings = {
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  'gentle': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

/**
 * Creates a click effect at the event location.
 * @param {MouseEvent} event - The click event.
 * @param {Object} options - Configuration options.
 * @param {string} options.effectType - Type of effect (default: 'valentines').
 * @param {string} options.character - Custom character to use, overrides effectType.
 * @param {number} options.count - Number of elements in the effect (default: 8).
 * @param {number[]} options.sizeRange - Size variation of elements (default: [10, 30]).
 * @param {number} options.duration - Animation duration in milliseconds (default: 1000ms).
 * @param {number} options.spread - How far particles travel in pixels (default: 40).
 * @param {boolean} options.gravity - Whether particles fall downward (default: false).
 * @param {boolean} options.rotate - Whether particles spin (default: false).
 * @param {string} options.easing - Animation easing ('ease-out'|'bounce'|'spring'|'gentle'|'ease-in-out', default: 'ease-out').
 */
export function createClickEffect(event, options = {}) {
  const {
    effectType = 'valentines',
    count = 8,
    sizeRange = [10, 30],
    duration = 1000,
    spread = 40,
    gravity = false,
    rotate = false,
    easing = 'ease-out',
  } = options;

  const effectSymbol = options.character || effects[effectType] || '✨';
  const easingValue = easings[easing] || easing;
  const effectContainer = document.createElement('div');
  effectContainer.style.position = 'absolute';
  effectContainer.style.left = `${event.pageX}px`;
  effectContainer.style.top = `${event.pageY}px`;
  effectContainer.style.pointerEvents = 'none';
  effectContainer.style.zIndex = '9999';
  document.body.appendChild(effectContainer);

  for (let i = 0; i < count; i++) {
    const effectElement = document.createElement('span');
    effectElement.textContent = effectSymbol;
    effectElement.style.position = 'absolute';
    effectElement.style.fontSize = `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`;
    effectElement.style.opacity = '1';
    effectElement.style.background = 'transparent';
    effectElement.style.lineHeight = '1';
    effectElement.style.transition = `transform ${duration / 1000}s ${easingValue}, opacity ${duration / 1000}s ease-out`;
    effectElement.style.willChange = 'transform, opacity';
    effectContainer.appendChild(effectElement);

    const angle = Math.random() * 2 * Math.PI;
    const minSpread = spread * 0.25;
    const radius = Math.random() * (spread - minSpread) + minSpread;
    const x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;

    if (gravity) {
      y = Math.abs(y) + spread * 0.5;
    }

    const rotation = rotate ? (Math.random() * 720 - 360) : 0;
    const scale = 0.2 + Math.random() * 0.4;

    setTimeout(() => {
      const rotateStr = rotate ? ` rotate(${rotation}deg)` : '';
      effectElement.style.transform = `translate(${x}px, ${y}px) scale(${scale})${rotateStr}`;
      effectElement.style.opacity = '0';
    }, 10);
  }

  setTimeout(() => {
    if (effectContainer.parentNode) {
      effectContainer.parentNode.removeChild(effectContainer);
    }
  }, duration);
}

/**
 * Attaches effects to the entire document or a specific element.
 * @param {HTMLElement} [target=document] - The target element.
 * @param {Object} options - Configuration options.
 * @param {'click'|'hover'} options.trigger - Event trigger type (default: 'click').
 * @param {number} options.throttle - Throttle interval in ms for hover trigger (default: 200).
 */
export function addPizzazz(target = document, options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};
  const { trigger = 'click', ...effectOptions } = options;
  const targetElement = target || document;
  const eventType = trigger === 'hover' ? 'mousemove' : 'click';
  let lastTrigger = -Infinity;
  const throttleMs = trigger === 'hover' ? (options.throttle ?? 200) : 0;
  const handler = (event) => {
    const now = Date.now();
    if (now - lastTrigger < throttleMs) return;
    lastTrigger = now;
    createClickEffect(event, effectOptions);
  };
  targetElement.addEventListener(eventType, handler);
  return () => targetElement.removeEventListener(eventType, handler);
}
