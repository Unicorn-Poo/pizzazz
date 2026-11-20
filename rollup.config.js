import resolve from '@rollup/plugin-node-resolve';

const library = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm'
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'named'
    }
  ],
  plugins: [resolve()]
};

export default [library, { input: "demo/main.js", output: { file: "demo/bundle.js", format: "esm" }, plugins: [resolve()] }];
