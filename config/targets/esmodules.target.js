module.exports = {
  output: {
    filename: 'index.esmodules.js',
  },
  babelrc: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true // supersedes browserlist
          },
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false, // don't transpile esmodules syntax
          spec: true,
          shippedProposals: true,
          ignoreBrowserslistConfig: true
        }
      ],
      '@babel/preset-react'
    ]
  }
};
