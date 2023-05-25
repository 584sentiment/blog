const {
  findAllClassifyService,
  findClassifyByIdService,
  deleteClassifyService,
  updateClassifyService,
  addClassifyService,
} = require('../services/classifyService')

const { ValidationError, formatResponse } = require('../../utils/errors')

const Router = require('@koa/router')

const router = new Router()

// prefix : /api/classify
router.get('/', async (ctx)=>{
  const result = await findAllClassifyService()
  ctx.body = formatResponse(0, "", result)
})

router.get('/:id', async (ctx) => {
  const result = await findClassifyByIdService(ctx.request.params.id)
  ctx.body = formatResponse(0, "", result)
})

router.post('/', async (ctx) => {
  // const newInfo = ctx.request.body
  const result = await addClassifyService(ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

router.delete('/:id', async (ctx)=>{
  const result = await deleteClassifyService(ctx.request.params.id)
  ctx.body = formatResponse(0, "", result)
})

router.patch('/:id', async (ctx) => {
  const result = await updateClassifyService(ctx.request.params.id, ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

module.exports = router