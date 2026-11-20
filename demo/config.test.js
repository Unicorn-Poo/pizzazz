import { initialState, buildSnippet, getOptions, updateSizeRange, copyText } from './config.js';

test('copied JavaScript preserves quotes, slashes, line breaks and selected options', () => {
  const state = { ...initialState, character: "a'\\\n`", gravity: true, trigger: 'hover', sizeRange: [12, 35] };
  const source = buildSnippet(state).replace(/^import .*;\n/, '');
  const attach = jest.fn(() => 'cleanup-fixture');
  const result = new Function('addPizzazz', 'document', source + '\nreturn cleanup;')(attach, {});
  expect(result).toBe('cleanup-fixture');
  expect(attach.mock.calls[0][1]).toEqual(getOptions(state));
  expect(attach.mock.calls[0][1].character).toBe(state.character);
});

test('moving either size endpoint keeps the exported range ordered', () => {
  expect(updateSizeRange([10, 30], 0, 35)).toEqual([35, 35]);
  expect(updateSizeRange([20, 30], 1, 12)).toEqual([12, 12]);
  expect(updateSizeRange([10, 30], 0, 18)).toEqual([18, 30]);
});

test('copy reports success only after the clipboard write resolves', async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  expect(await copyText('source-fixture', { writeText })).toBe(true);
  expect(writeText).toHaveBeenCalledWith('source-fixture');
  expect(await copyText('source-fixture', { writeText: jest.fn().mockRejectedValue(new Error('denied')) })).toBe(false);
  expect(await copyText('source-fixture', null)).toBe(false);
});
