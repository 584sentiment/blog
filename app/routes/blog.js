const {
  addBlogService,
  deleteBlogService,
  updateBlogService,
  findBlogByPageService,
  findBlogByIdService,
} = require('../services/blogService')

const Router = require('@koa/router')

const {formatResponse} = require('../../utils/errors')

const router = new Router()

router.post('/', async (ctx)=>{
  const result = await addBlogService(ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

router.delete('/:id', async (ctx)=>{
  const result = await deleteBlogService(ctx.params.id)
  ctx.body = formatResponse(0, "", result)
})

router.patch('/:id', async (ctx)=>{
  const result = await updateBlogService(ctx.params.id, ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

router.get('/', async (ctx)=>{
  const result = await findBlogByPageService(ctx.query)
  ctx.body = formatResponse(0, "", result)
})

router.get('/:id', async (ctx)=>{
  const result = await findBlogByIdService(ctx.params.id)
  ctx.body = formatResponse(0, "", result)
})

module.exports = router