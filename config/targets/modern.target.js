module.exports = {
  esmodules: 'index.esmodules.js',
  html: 'index.modern.html',
  filename: 'index.modern.js',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 1 version', 'not ie 11', 'not op_mini all', 'not dead']
          },
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          shippedProposals: true
        }
      ],
      '@babel/preset-react'
    ]
  }
};
