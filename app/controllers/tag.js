// 引入模型

const tagModel = require('../models/tagModel');

/**
 * 返回所有标签信息
 * @returns 标签数组
 */
const findAllTags = async () => {
  return await tagModel.find()
}

/**
 * 添加一个标签
 * @param {*} newTagInfo 新标签信息
 * @returns 操作结果
 */
const addTag = async (newTagInfo) => {
  return await tagModel.create(newTagInfo)
}

/**
 * 根据id删除标签
 * @param {Schema.ObjectId} id mongoose自动生成的id
 * @returns 删除结果
 */
const deleteTag = async (id) => {
  return await tagModel.deleteOne({ _id: id })
}

/**
 * 修改id对应的标签名
 * @param {*} id 
 * @param {Object} newTagInfo {tagName: xxx}
 * @returns 返回操作结果
 */
const updateTag = async (id, newTagInfo) => {
  return await tagModel.updateOne({ _id: id }, newTagInfo)
}

/**
 * 根据id查找标签名
 * @param {*} id 
 * @returns 返回查询到的结果 array
 */
const findTagById = async (id) => {
  return await tagModel.findById(id);
}

/**
 * 
 * @param {String} tagName 字符串
 * @returns array 返回查询结果
 */
const findTagByTagname = async (tagName) => {
  return await tagModel.find({tagName})
}

module.exports = {
  addTag,
  deleteTag,
  updateTag,
  findTagById,
  findAllTags,
  findTagByTagname,
}