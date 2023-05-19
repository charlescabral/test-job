import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'public/scripts.js',
    format: 'iife',
  },
  plugins: [babel()]
}
