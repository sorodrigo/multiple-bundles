module.exports = {
  filename: 'index.esmodules.js',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true
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
