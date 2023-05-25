const {
  findAllFlinksService,
  findFlinkByIdService,
  addFlinkService,
  deleteFlinkService,
  updateFlinkService,
} = require('../services/friendService')

const Router = require("@koa/router")

const { ValidationError, formatResponse } = require('../../utils/errors')

const router = new Router()


// prefix : api/friend

// 获取所有友链信息
router.get('/', async (ctx)=> {
  const result = await findAllFlinksService()
  ctx.body = formatResponse(0, "", result)
})

// 新增一个友链信息
router.post('/', async (ctx) => {
  const result = await addFlinkService(ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

// 根据id删除一条友链信息
router.delete('/:id', async (ctx) => {
  const result = await deleteFlinkService(ctx.request.params.id)
  ctx.body = formatResponse(0, "", result)
})

// 根据id修改一条友链信息
router.patch('/:id', async (ctx) => {
  const result = await updateFlinkService(ctx.request.params.id, ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

module.exports = router