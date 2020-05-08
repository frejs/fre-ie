import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import jsx from 'rollup-plugin-jsx'

export default {
  input: 'src/index.js',

  output: {
    file: 'dist/freie.js',
    format: 'iife',
    name: 'freie',
    sourcemap: true,
  },

  plugins: [
    nodeResolve({
      module: true,
      jsnext: true,
      browser: true,
      extensions: ['.js', '.jsx'],
      preferBuiltins: false,
    }),

    jsx({ factory: 'h' }),

    babel({
      presets: ['es2015-rollup', 'es3'],
      exclude: 'node_modules/**',
    }),
  ],
}
