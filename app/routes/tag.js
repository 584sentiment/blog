const Router = require('@koa/router');

const { ValidationError, formatResponse } = require('../../utils/errors')

const router = Router()

const {
  addTagService,
  deleteTagByIdService,
  updateTagService,
  findAllTagService,
} = require('../services/tagService')

// prefix: /api/tag

// 获取所有标签
router.get('/', async (ctx) => {
  const result = await findAllTagService()
  // 对返回数据进行格式化
  ctx.body = formatResponse(0, "", result)
})

// 添加一个标签
router.post('/', async (ctx) => {
  const result = await addTagService(ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

// 根据id删除标签
router.delete('/:id', async (ctx) => {
  const result = await deleteTagByIdService(ctx.request.params.id)
  ctx.body = formatResponse(0, "", result)
})

// 修改id对应的标签
router.patch('/:id', async (ctx) => {
  const result = await updateTagService(ctx.request.params.id, ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})


module.exports = router