const demoModel = require('../models/demoModel')

const findDemoByPage = async (pageInfo) => {
  const filter = {}
  if (pageInfo.tagId) {
    filter.tagId = pageInfo.tagId
  }
  if (pageInfo.classifyId) {
    filter.classifyId = pageInfo.classifyId
  }
  const pageObj = {
    current: Number(pageInfo.current) || 1,
    pageSize: Number(pageInfo.pageSize) || 10
  }

  pageObj.count = await demoModel.countDocuments(filter)
  pageObj.data = await demoModel
    .find(filter)
    .skip((pageObj.current - 1) * pageObj.pageSize)
    .limit(pageObj.pageSize)
  return pageObj
}

const findDemoById = async (id) => {
  return await demoModel.findById(id)
}

const deleteDemo = async (id) => {
  return await demoModel.deleteOne({ _id: id })
}

const addDemo = async (demoInfo) => {
  return await demoModel.create(demoInfo)
}

const updateDemo = async (id, demoInfo) => {
  return await demoModel.updateOne({ _id: id }, demoInfo)
}

module.exports = {
  findDemoByPage,
  findDemoById,
  deleteDemo,
  addDemo,
  updateDemo,
}