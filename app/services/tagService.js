// 具体业务逻辑，

const {
  addTag,
  deleteTag,
  updateTag,
  findTagById,
  findAllTags,
  findTagByTagname
} = require('../controllers/tag')

const { validate } = require('validate');
const { tagRule } = require('./rules');
const { ValidationError } = require('../../utils/errors');

// 增
const addTagService = async (newTagInfo)=>{
  const errs = await tagRule.validate(newTagInfo)
  // console.log(errs)
  if(errs.length !== 0){
    // 验证不通过
    return new ValidationError('数据验证失败')
  }
  // 验证通过
  // 查看tagName是否已存在
  const {tagName} = newTagInfo
  const res = await findTagByTagname(tagName);
  // console.log(res, 'res')
  if(res.length){
    return new ValidationError(`标签${tagName}已存在`)
  }
  return await addTag(newTagInfo)
}

// 删
const deleteTagByIdService = async (id) => {
  return await deleteTag(id)
}

// 改
const updateTagService = async (id, newTagInfo) => {
  return await updateTag(id, newTagInfo)
}

// 查
const findAllTagService = async () => {
  return await findAllTags()
}

const findTagByIdService = async (id) => {
  return await findTagById(id);
}

module.exports = {
  addTagService,
  deleteTagByIdService,
  updateTagService,
  findAllTagService,
  findTagByIdService,
}
