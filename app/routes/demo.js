const {
  addDemoService,
  deleteDemoService,
  updateDemoService,
  findDemoByPageService,
  findDemoByIdService,
} = require('../services/demoService')

const {ValidationError, formatResponse} = require('../../utils/errors')

const Router = require('@koa/router')

const router = new Router();

// prefix: /api/demo
router.get('/', async (ctx)=>{
  const result = await findDemoByPageService(ctx.query)
  ctx.body = formatResponse(0, "", result)
})

router.get('/:id', async (ctx)=>{
  const result = await findDemoByIdService(ctx.params.id)
  ctx.body = formatResponse(0, "", result)
})

router.post('/', async (ctx, next)=>{
  const result = await addDemoService(ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

router.delete('/:id', async (ctx) => {
  const result = await deleteDemoService(ctx.params.id)
  ctx.body = formatResponse(0, "", result)
})

router.patch('/:id', async (ctx) => {
  // console.log(ctx.request.body)
  const result = await updateDemoService(ctx.params.id, ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})
module.exports = router