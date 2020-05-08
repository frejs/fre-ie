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

    babel({
      presets: ['es2015-rollup', 'es3'],
      plugins:[
        [
          "babel-plugin-transform-react-jsx",
          {
            "pragma": "h",
            "pragmaFrag": "Fragment"
          }
        ]
      ],
      exclude: 'node_modules/**',
    }),
  ],
}
