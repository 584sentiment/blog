const friendModel = require('../models/friendsModel')

const findAllFlinks = async () => {
  return await friendModel.find()
}

const findFlinkById = async (id) => {
  return await friendModel.findById(id)
}