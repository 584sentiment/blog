const commentModel = require('../models/commentModel')

const addComment = async (commentInfo) => {
  return await commentModel.create(commentInfo)
}

const deleteComment = async (id) => {
  const comment = await commentModel.findById(id)
  if (!comment) return;
  for (const replyId of comment.reply) {
    deleteComment(replyId)
  }
  await commentModel.findByIdAndDelete(id)
  return await commentModel.find()
}



const updateComment = async (id, commentInfo) => {
  return await commentModel.updateOne({ _id: id }, commentInfo)
}

const findCommentByPage = async (pageInfo) => {
  const filters = {}
  if (pageInfo.userId) {
    filters.userId = pageInfo.userId
  }
  if (pageInfo.blogId) {
    filters.blogId = pageInfo.blogId
  }
  const pageObj = {
    current: Number(pageInfo.current) || 1,
    pageSize: Number(pageInfo.pageSize) || 10
  }
  pageObj.count = await commentModel.countDocuments(filters)
  pageObj.data = await commentModel
    .find(filters)
    .skip((pageObj.current - 1) * pageObj.pageSize)
    .limit(pageObj.pageSize)
  return pageObj
}

const findCommentById = async (id) => {
  return await commentModel.findById(id)
}

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  findCommentByPage,
  findCommentById,
}