import { createClickEffect, addPizzazz } from './index';

describe('Click Effects Library', () => {
  beforeEach(() => {
    document.body.innerHTML = ''; // Clear the DOM before each test
  });

  test('Creates effect elements on click', () => {
    const event = { clientX: 100, clientY: 200 }; // Simulated event
    createClickEffect(event, { effectType: 'valentines', count: 5 });

    const effectElements = document.querySelectorAll('span');
    expect(effectElements.length).toBe(5);
  });

  test('Uses default effect symbol when type is unknown', () => {
    const event = { clientX: 100, clientY: 200 };
    createClickEffect(event, { effectType: 'unknown' });

    const effectElements = document.querySelectorAll('span');
    expect(effectElements[0].innerHTML).toBe('✨'); // Default effect symbol
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
      expect(element.innerHTML).toBe(customChar);
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

    // Second event at 50ms — should be throttled
    jest.setSystemTime(50);
    el.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(2);

    // Third event at 250ms — should fire
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
    document.body.innerHTML = '';

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelectorAll('span').length).toBe(0);
  });
});