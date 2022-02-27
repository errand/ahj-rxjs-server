/* eslint-disable no-fallthrough */

const Koa = require('koa');
const koaBody = require('koa-body');

const TicketController = require('./src/TicketController');

const ctrl = new TicketController();

const app = new Koa();
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

app.use(async (ctx) => {
  const { method, id } = ctx.request.query;
  // console.log(ctx.request.query);
  switch (method) {
    case 'createRandomTicket':
      try {
        const result = ctrl.createRandomTicket();
        ctx.response.body = result;
        return;
      } catch (err) {
        console.error(err);
      }
    case 'allTickets':
      try {
        const result = ctrl.allTickets();
        ctx.response.body = result;
      } catch (err) {
        console.error(err);
      }
      return;
    case 'createTicket':
      try {
        const object = ctx.request.body;

        const result = ctrl.createTicket(object);
        ctx.response.body = result;
      } catch (err) {
        console.error(err);
      }
      return;
    case 'getTicketById':
      try {
        const result = ctrl.getTicketById(id);
        ctx.response.body = result;
        console.log(result, 'result');
      } catch (err) {
        console.error(err);
      }
      return;

    case 'deleteTicket':
      try {
        const result = ctrl.deleteTicket(id);
        console.log(result, 'result');
        ctx.response.body = result;
      } catch (err) {
        console.error(err);
      }
      return;

    default:
      ctx.response.body = `Method "${method}" is not known.`;
      ctx.response.status = 404;
  }
});

app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
