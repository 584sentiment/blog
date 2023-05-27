const friendModel = require('../models/friendModel')

const findAllFlinks = async () => {
  return await friendModel.find()
}

const findFlinkById = async (id) => {
  return await friendModel.findById(id)
}

const addFlink = async (linkInfo) => {
  return await friendModel.create(linkInfo)
}

const deleteFlink = async (id)=>{
  return await friendModel.deleteOne({_id: id})
}

const updateFlink = async (id, newInfo)=>{
  return await friendModel.updateOne({_id:id}, newInfo)
}

module.exports = {
  findAllFlinks,
  findFlinkById,
  addFlink,
  deleteFlink,
  updateFlink,
}