const Router = require('@koa/router');
const { ValidationError, formatResponse } = require('../../utils/errors');

const router = new Router();

const {
  loginService,
  addUserService,
  deleteUserService,
  findUserByIdService,
  updateUserService,
  isUserExistService,
  findTopTenUsersByPointsService,
  isPwdValid
} = require('../services/userService');

// prefix: /api/user
// 用户登录
router.post('/login', async (ctx, next) => {
  console.log(ctx.request.body.captcha);
  console.log(ctx.session.captcha);
  if (ctx.request.body.captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
    next(new ValidationError("验证码错误"));
    return;
  }
  const result = await loginService(ctx.request.body);
  ctx.body = formatResponse(0, "", result);
});


// 用户恢复登录
router.get('/whoami', async (ctx, next) => {
  // koa-jwt 自动解析的token
  const token = ctx.state.user;
  if (token) {
    ctx.body = formatResponse(0, "", {
      _id: token._id,
      username: token.username
    })
  } else {
    next(new ValidationError('登录过期，请重新登录'));
  }
})


// 活跃用户
router.get('/pointsrank', async (ctx, next) => {
  const result = await findTopTenUsersByPointsService();
  ctx.body = formatResponse(0, "", result);
})


// 用户注册
router.post('/', async (ctx, next) => {
  console.log(ctx.request.body.captcha)
  if (ctx.request.body.type !== "backgroud" && ctx.request.body.captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
    next(new ValidationError("验证码错误"));
    return;
  }
  const result = await addUserService(ctx.request.body);
  if (result && result._id) {
    ctx.body = formatResponse(0, "", result);
  } else {
    next(result);
  }
})

// 根据id删除用户
router.delete('/:id', async (ctx, next)=>{
  console.log(ctx)
  const result = await deleteUserService(ctx.request.params.id);
  ctx.body = formatResponse(0, "", result);
})

// 根据id查找用户
router.get('/:id', async (ctx, next)=>{
  const result = await findUserByIdService(ctx.request.params.id);
  ctx.body = formatResponse(0, "", result);
})

// 根据id修改用户
router.patch('/:id', async (ctx, next)=>{
  const result = await updateUserService(ctx.request.params.id, ctx.request.body);
  ctx.body = formatResponse(0, "", result);
})

// 根据用户名username 判断用户是否存在
router.get('/isUserExist/:username', async (ctx, next)=>{
  console.log(ctx.request.params.username)
  const result = await isUserExistService(ctx.request.params.username);
  ctx.body = formatResponse(0, "", result);
})

// 验证用户密码，修改密码时验证原密码使用
router.get('/isPwdValid',async (ctx, next)=>{
  const result = await isPwdValid(ctx.request.body);
  return formatResponse(0, "", result);
})

module.exports = router;