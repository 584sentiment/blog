const classifyModel = require('../models/classifyModel');

const findAllClassify = async () => {
  return await classifyModel.find()
}
const findClassifyById = async (id) => {
  return await classifyModel.findById(id)
}
const findClassifyByName = async (classifyName) => {
  return await classifyModel.findOne({classifyName})
}
const deleteClassify = async (id) => {
  return await classifyModel.deleteOne({_id:id})
}
const updateClassify = async (id, newInfo) => {
  return await classifyModel.updateOne({_id: id}, newInfo)
}
const addClassify = async (newInfo) => {
  return await classifyModel.create(newInfo)
}

module.exports = {
  findAllClassify,
  findClassifyById,
  deleteClassify,
  updateClassify,
  addClassify,
  findClassifyByName,
}