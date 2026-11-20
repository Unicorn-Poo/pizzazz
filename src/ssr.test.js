/** @jest-environment node */
import addDefault, { addPizzazz, createClickEffect } from './index.js';

test('the declared default export is the named attachment API', () => {
  expect(addDefault).toBe(addPizzazz);
});

test('server rendering needs no document even when the target is omitted', () => {
  expect(typeof document).toBe('undefined');
  const cleanup = addPizzazz();
  expect(typeof cleanup).toBe('function');
  expect(() => cleanup()).not.toThrow();
  expect(() => createClickEffect({})).not.toThrow();
});
