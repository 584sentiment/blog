const {
  addComment,
  deleteComment,
  updateComment,
  findCommentByPage,
  findCommentById,
} = require('../controllers/comment')

const { commentRule, commentReplyRule } = require('./rules')
const {ValidationError} = require('../../utils/errors')

const addCommentService = async (commentInfo, reply = true) => {
  let errs;
  if(reply){
    errs = await commentRule.validate(commentInfo)
  }else{
    errs = await commentReplyRule.validate(commentInfo)
  }
  
  if(errs.length){
    return new ValidationError(errs[0].message)
  }
  commentInfo.createTime = Date.now()
  commentInfo.reply = []
  return await addComment(commentInfo)
}

const deleteCommentService = async (id) => {
  return await deleteComment(id)
}

// 后台管理可用，前端只能查看和评论回复
const updateCommentService = async (id, commentInfo) => {
  return await updateComment(id, commentInfo)
}

const findCommentByPageService = async (pageInfo) => {
  return await findCommentByPage(pageInfo)
}

const findCommentByIdService = async (id) => {
  return await findCommentById(id)
}

module.exports = {
  addCommentService,
  deleteCommentService,
  updateCommentService,
  findCommentByPageService,
  findCommentByIdService,
}