/* eslint-disable no-fallthrough */

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const Router = require('koa-router');

const router = new Router();

const Faker = require('./src/Faker');

const faker = new Faker();

const app = new Koa();
app.use(cors());
const PORT = process.env.PORT || 7070;

app.use(koaBody({
  text: true,
  urlencoded: true,
  json: true,
  multipart: true,
}));

// eslint-disable-next-line consistent-return
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });
    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set(
        'Access-Control-Allow-Headers',
        ctx.request.get('Access-Control-Allow-Request-Headers'),
      );
    }
    ctx.response.status = 204; // No content
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/messages/unread', async (ctx) => {
  faker.start();
  ctx.response.body = JSON.stringify({
    status: 'ok',
    messages: faker.messages,
    timestamp: Date.now(),
  });
  console.log(ctx.response.body, 'result');
});

app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
