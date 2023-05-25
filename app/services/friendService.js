const {
  findAllFlinks,
  findFlinkById,
  addFlink,
  deleteFlink,
  updateFlink,
} = require('../controllers/friend')

const { friendRule } = require('./rules')
const { ValidationError } = require('../../utils/errors')

const findAllFlinksService = async () => {
  return await findAllFlinks()
}

const findFlinkByIdService = async (id) => {
  return await findFlinkById(id)
}
const addFlinkService = async (linkInfo) => {
  const errs = await friendRule.validate(linkInfo)
  if(errs.length){
    return new ValidationError(errs[0].message)
  }
  return await addFlink(linkInfo)
}
const deleteFlinkService = async (id) => {
  return await deleteFlink(id)
}
const updateFlinkService = async (id, newInfo) => {
  return await updateFlink(id, newInfo)
}

module.exports = {
  findAllFlinksService,
  findFlinkByIdService,
  addFlinkService,
  deleteFlinkService,
  updateFlinkService,
}