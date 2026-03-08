import { createClickEffect, addPizzazz } from './index';

describe('Click Effects Library', () => {
  beforeEach(() => {
    document.body.textContent = '';
  });

  test('Creates effect elements on click', () => {
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { effectType: 'valentines', count: 5 });

    const effectElements = document.querySelectorAll('span');
    expect(effectElements.length).toBe(5);
  });

  test('Uses default effect symbol when type is unknown', () => {
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { effectType: 'unknown' });

    const effectElements = document.querySelectorAll('span');
    expect(effectElements[0].textContent).toContain('✨');
  });

  test('Effect elements are removed after duration', () => {
    jest.useFakeTimers();
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { effectType: 'fire', duration: 500 });

    expect(document.body.querySelector('div')).not.toBeNull();

    jest.advanceTimersByTime(500);
    expect(document.body.querySelector('div')).toBeNull();
  });

  test('Uses custom character when provided', () => {
    const event = { clientX: 100, clientY: 200 };
    const customChar = '🍕';
    createClickEffect(event, { character: customChar, count: 3 });

    const effectElements = document.querySelectorAll('span');
    effectElements.forEach(element => {
      expect(element.textContent).toBe(customChar);
    });
  });

  test('addPizzazz with hover trigger listens to mousemove', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const cleanup = addPizzazz(el, { trigger: 'hover', count: 3 });

    el.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(3);

    cleanup();
  });

  test('addPizzazz with hover trigger throttles events', () => {
    jest.useFakeTimers();
    jest.setSystemTime(0);

    const el = document.createElement('div');
    document.body.appendChild(el);
    const cleanup = addPizzazz(el, { trigger: 'hover', count: 2, throttle: 200 });

    el.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(2);

    jest.setSystemTime(50);
    el.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(2);

    jest.setSystemTime(250);
    el.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(4);

    cleanup();
    jest.useRealTimers();
  });

  test('addPizzazz cleanup removes listener', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const cleanup = addPizzazz(el, { count: 2 });

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(2);

    cleanup();
    document.body.textContent = '';

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(0);
  });

  test('Applies gravity option - particles move downward', () => {
    jest.useFakeTimers();
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { gravity: true, count: 1, spread: 40 });

    jest.advanceTimersByTime(20);

    const span = document.querySelector('span');
    const transform = span.style.transform;
    const yMatch = transform.match(/translate\([^,]+,\s*([\d.]+)px\)/);
    expect(Number(yMatch[1])).toBeGreaterThan(0);

    jest.useRealTimers();
  });

  test('Applies rotation option', () => {
    jest.useFakeTimers();
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { rotate: true, count: 1 });

    jest.advanceTimersByTime(20);

    const span = document.querySelector('span');
    expect(span.style.transform).toContain('rotate(');

    jest.useRealTimers();
  });

  test('Respects spread option', () => {
    jest.useFakeTimers();
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { spread: 100, count: 1 });

    jest.advanceTimersByTime(20);

    const span = document.querySelector('span');
    const transform = span.style.transform;
    expect(transform).toContain('translate(');

    jest.useRealTimers();
  });

  test('Applies easing option', () => {
    jest.useFakeTimers();
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { easing: 'bounce', count: 1 });

    const span = document.querySelector('span');
    expect(span.style.transition).toContain('cubic-bezier');

    jest.useRealTimers();
  });
});
