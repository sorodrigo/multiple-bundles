module.exports = {
  output: {
    filename: 'index.modern.js',
    html: 'index.modern.html',
    esmodules: 'index.esmodules.js'
  },
  babelrc: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>0.25%', 'not ie 11', 'not op_mini all', 'not dead', 'not safari < 11']
          },
          useBuiltIns: 'entry',
          corejs: 3,
          spec: true,
          shippedProposals: true,
          ignoreBrowserslistConfig: true
        }
      ],
      '@babel/preset-react'
    ]
  }
};
