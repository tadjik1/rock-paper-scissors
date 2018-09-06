const Koa = require('koa');
const serve = require('koa-static');
const uuid = require('uuid/v4');
const config = require('./config');

const app = new Koa();

app.use(serve('public'));

app.listen(config.PORT, _ => {
  console.log(`Application is running on port: ${config.PORT}`);
});

