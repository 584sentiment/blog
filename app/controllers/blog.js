const blogModel = require('../models/blogModel')

const addBlog = async (blogInfo) => {
  return await blogModel.create(blogInfo)
}

const deleteBlog = async (id) => {
  return await blogModel.deleteOne({ _id: id })
}

const updateBlog = async (id, blogInfo) => {
  return await blogModel.updateOne({ _id: id }, blogInfo)
}

const findBlogByPage = async (pageInfo) => {
  const filters = {}
  if (pageInfo.tagId) {
    filters.tagId = pageInfo.tagId
  }
  if (pageInfo.classifyId) {
    filters.classifyId = pageInfo.classifyId
  }
  const pageObj = {
    current: Number(pageInfo.current) || 1,
    pageSize: Number(pageInfo.pageSize) || 10
  }
  pageObj.count = await blogModel.countDocuments(filters)
  pageObj.data = await blogModel
    .find(filters)
    .skip((pageObj.current - 1) * pageObj.pageSize)
    .limit(pageObj.pageSize)
  return pageObj
}

const findBlogById = async (id) => {
  return await blogModel.findById(id)
}

module.exports = {
  addBlog,
  deleteBlog,
  updateBlog,
  findBlogByPage,
  findBlogById,
}