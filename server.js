'use strict';

const koa = require('koa');
const render = require('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const staticCache = require('koa-static-cache')

const app = koa();

render(app, {
  root: path.join(__dirname, 'page'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(staticCache(path.join(__dirname, 'static'), {
  buffer: false,
}));

app.use(function *() {
  const data = fs.readJsonSync(path.join(__dirname, 'data', this.path + '.json'), {throws: false});
  yield this.render(this.path.substring(1), data);
});

app.listen(3000);