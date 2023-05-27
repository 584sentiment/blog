const {
  addBlog,
  deleteBlog,
  updateBlog,
  findBlogByPage,
  findBlogById,
} = require('../controllers/blog')

const {formatResponse, ValidationError} = require('../../utils/errors')
const {blogRule} = require('./rules')

const addBlogService = async (blogInfo) => {
  const errs = await blogRule.validate(blogInfo)
  if(errs.length){
    return new ValidationError(errs[0].message)
  }
  blogInfo.author = blogInfo.author || ''
  blogInfo.borwseNum = 0
  blogInfo.likes = 0
  blogInfo.createDate = Date.now()
  blogInfo.updateDate = blogInfo.createDate
  blogInfo.enable = false
  return await addBlog(blogInfo) 
}

const deleteBlogService = async (id) => {
  return await deleteBlog(id)
}

const updateBlogService = async (id, blogInfo) => {
  return await updateBlog(id, blogInfo)
}

const findBlogByPageService = async (pageInfo) => {
  return await findBlogByPage(pageInfo)
}

const findBlogByIdService = async (id) => {
  return await findBlogById(id)
}

module.exports = {
  addBlogService,
  deleteBlogService,
  updateBlogService,
  findBlogByPageService,
  findBlogByIdService,
}