const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const { matchesUA } = require('browserslist-useragent');

const app = express();
const port = process.env.PORT || 5000;

const TARGETS = {
  legacy: require(path.join(process.cwd(), 'config', 'targets', 'legacy.target')),
  modern: require(path.join(process.cwd(), 'config', 'targets', 'modern.target'))
};
const MODERN_TARGET_BABELRC = TARGETS.modern.babelrc.presets.find(preset =>
  preset.includes('preset-env')
);

const MODERN_TARGET_BROWSERLIST =
  MODERN_TARGET_BABELRC && MODERN_TARGET_BABELRC[1].targets.browsers;


const sendHtml = (req, res) => {
  const userAgent = req.get('User-Agent');
  const isModern = MODERN_TARGET_BROWSERLIST && matchesUA(userAgent, { browsers: MODERN_TARGET_BROWSERLIST });
  app.use(express.static(path.join(__dirname, '/dist')));
  if (isModern) {
    return res.sendFile(path.join(__dirname, 'dist', TARGETS.modern.output.html));
  }
  return res.sendFile(path.join(__dirname, 'dist', TARGETS.legacy.output.html));
};

app.get('/', sendHtml);
app.get('/index.html', sendHtml);
app.get('/index.modern.html', sendHtml);
app.use(express.static(path.join(__dirname, '/dist')));
app.get('*', sendHtml);


app.listen(port, () => console.info(`Server started at ${port}`));
