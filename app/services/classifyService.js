const {
  findAllClassify,
  findClassifyById,
  deleteClassify,
  updateClassify,
  addClassify,
  findClassifyByName,
} = require('../controllers/classify')

const { classifyRule } = require('./rules')
const { ValidationError } = require('../../utils/errors')


const findAllClassifyService = async () => {
  return await findAllClassify()
}

const findClassifyByIdService = async (id) => {
  return await findClassifyById(id)
}

const deleteClassifyService = async (id) => {
  return await deleteClassify(id)
}

const updateClassifyService = async (id, newInfo) => {
  return await updateClassify(id, newInfo)
}

const addClassifyService = async (newInfo) => {
  const errs = classifyRule.validate(newInfo)
  if(errs.length){
    return new ValidationError('数据验证失败')
  }
  const {classifyName} = newInfo
  const res = await findClassifyByName(classifyName)
  if(res){
    return new ValidationError(`分类:${classifyName}已存在`)
  }
  return await addClassify(newInfo)
}

module.exports = {
  findAllClassifyService,
  findClassifyByIdService,
  deleteClassifyService,
  updateClassifyService,
  addClassifyService,
}