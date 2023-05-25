const Router = require('@koa/router');

const { getCaptchaService } = require('../services/captchaService.js');

const router = new Router();

router.get('/', async (ctx, next) => {
  const captcha = await getCaptchaService();
  ctx.session.captcha = captcha.text;
  ctx.res.setHeader("Content-type", "image/svg+xml");
  ctx.body = captcha.data;
})

module.exports = router;