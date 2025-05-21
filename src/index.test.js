import { createClickEffect } from './index';

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
});