const {
  addCommentService,
  deleteCommentService,
  updateCommentService,
  findCommentByPageService,
  findCommentByIdService,
} = require('../services/commentService')

const { formatResponse } = require('../../utils/errors')
const Router = require('@koa/router')
const router = new Router()

router.post('/', async (ctx) => {
  const result = await addCommentService(ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

router.delete('/:id', async (ctx) => {
  const result = await deleteCommentService(ctx.params.id)
  ctx.body = formatResponse(0, "", result)
})

router.patch('/:id', async (ctx) => {
  const result = await updateCommentService(ctx.params.id, ctx.request.body)
  ctx.body = formatResponse(0, "", result)
})

router.get('/', async (ctx) => {
  const result = await findCommentByPageService(ctx.query)
  ctx.body = formatResponse(0, "", result)
})

router.get('/:id', async (ctx) => {
  const result = await findCommentByIdService(ctx.params.id)
  ctx.body = formatResponse(0, "", result)
})

router.post('/:id', async (ctx) => {
  // 获取被回复的评论id
  const id = ctx.params.id
  // 创建评论
  const replyComment = await addCommentService(ctx.request.body, false)
  // 获取原评论
  const originComment = await findCommentByIdService(id)
  // 获取原评论的回复列表
  const replies = originComment.reply
  // 加入新评论的id
  replies.push(replyComment)
  console.log(replies)
  // 更新原评论的回复列表
  await updateCommentService(id, { reply: replies })
  const result = await findCommentByIdService(id)
  ctx.body = formatResponse(0, "", result)
})



module.exports = router