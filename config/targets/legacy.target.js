module.exports = {
  html: 'index.html',
  filename: 'index.legacy.js',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 version', 'safari >= 10', 'firefox ESR']
          },
          useBuiltIns: 'entry',
          corejs: 3
        }
      ],
      '@babel/preset-react'
    ]
  },
  plugins: ['@babel/plugin-syntax-object-rest-spread']
};
