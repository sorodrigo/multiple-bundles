module.exports = {
  output: {
    filename: 'index.legacy.js',
    html: 'index.html'
  },
  babelrc: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions', 'safari >= 10']
          },
          useBuiltIns: 'entry',
          corejs: 3,
          spec: true,
          ignoreBrowserslistConfig: true
        }
      ],
      '@babel/preset-react'
    ],
    plugins: ['@babel/plugin-syntax-object-rest-spread']
  }
};
