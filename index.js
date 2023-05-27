require("dotenv").config();
const Koa = require('koa');
const Router = require('@koa/router');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const Jwt = require('koa-jwt');
const session = require('koa-session');
const logger = require("koa-logger");
const koa_static = require('koa-static');

const {ServiceError, UnknownError} = require('./utils/errors')

// 默认读取项目根目录下的 .env 环境变量文件
require('./config/init');

const userRouter = require('./app/routes/user');
const captchaRouter = require('./app/routes/captcha');
// const commentRouter = require('./app/routes/comment');
const tagRouter = require('./app/routes/tag');
const classifyRouter = require('./app/routes/classify');
const blogRouter = require('./app/routes/blog');
const demoRouter = require('./app/routes/demo');
const friendRouter = require('./app/routes/friend');





const app = new Koa();
app.keys = [process.env.SESSION_SECRET];

app.use(session(app));
app.use(logger());
app.use(bodyparser());
app.use(koa_static(path.join(__dirname, 'public')))

app.use(function (ctx, next) {
  return next().catch((err) => {
    console.log(err)
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
      // ctx.body = { error: err.originalError ? err.originalError.message : err.message };
    } else {
      throw err;
    }
  });
});

app.use(Jwt({ secret: process.env.JWT_SECRET, debug: false }).unless({ path: [/^\/api\/user\/isUserExist\/\w+$/,'/api/user/login',  '/api/captcha', '/api/user/'] }));

const router = new Router({ prefix: '/api' });

router.use('/user', userRouter.routes());
router.use('/blog', blogRouter.routes());
router.use('/classify', classifyRouter.routes());
router.use('/tag', tagRouter.routes());
// router.use('/comment', userRouter.routes());
router.use('/demo', demoRouter.routes());
router.use('/friend', friendRouter.routes());
router.use('/captcha', captchaRouter.routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

// 错误处理，一旦发生了错误，就会到这里来
// app.use(function (ctx, next) {
//   if (ctx.err instanceof ServiceError) {
//     ctx.body=ctx.err.toResponseJSON();
//   } else {
//     ctx.body = new UnknownError().toResponseJSON();
//     throw ctx.err;
//   }
// });

// 全局监听异常信息
app.on('error', err => {
  console.error('server error', err)
});

const port = 7001
app.listen(port, () => {
  console.log(`server listening ${port}`);
})