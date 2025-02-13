const effects = {
  valentines: '❤️',
  celebration: '🎉',
  stars: '✨',
  snow: '❄️',
  fire: '🔥',
  confetti: '🎊',
  bubbles: '🫧',
  ghost: '👻',
};

/**
 * Creates a click effect at the event location.
 * @param {MouseEvent} event - The click event.
 * @param {Object} options - Configuration options.
 * @param {string} options.effectType - Type of effect (default: 'valentines').
 * @param {number} options.count - Number of elements in the effect (default: 8).
 * @param {number} options.sizeRange - Size variation of elements (default: 10-30px).
 * @param {number} options.duration - Animation duration in milliseconds (default: 1000ms).
 */
export function createClickEffect(event, options = {}) {
  const {
    effectType = 'valentines',
    count = 8,
    sizeRange = [10, 30],
    duration = 1000
  } = options;

  const effectSymbol = effects[effectType] || '✨';
  const effectContainer = document.createElement('div');
  effectContainer.style.position = 'absolute';
  effectContainer.style.left = `${event.clientX}px`;
  effectContainer.style.top = `${event.clientY}px`;
  effectContainer.style.pointerEvents = 'none';
  effectContainer.style.zIndex = '9999';
  document.body.appendChild(effectContainer);

  for (let i = 0; i < count; i++) {
    const effectElement = document.createElement('span');
    effectElement.innerHTML = effectSymbol;
    effectElement.style.position = 'absolute';
    effectElement.style.fontSize = `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`;
    effectElement.style.opacity = '1';
    effectElement.style.transition = `transform ${duration / 1000}s ease-out, opacity ${duration / 1000}s ease-out`;
    effectContainer.appendChild(effectElement);

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 30 + 10;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    setTimeout(() => {
      effectElement.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
      effectElement.style.opacity = '0';
    }, 10);
  }

  setTimeout(() => {
    document.body.removeChild(effectContainer);
  }, duration);
}

/**
 * Attaches click effects to the entire document or a specific element.
 * @param {HTMLElement} [target=document] - The target element.
 * @param {Object} options - Configuration options.
 */
export function addPizzazz(target = document, options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const targetElement = target || document;
  targetElement.addEventListener('click', (event) => createClickEffect(event, options));
}
