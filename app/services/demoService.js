const {
  findDemoByPage,
  findDemoById,
  deleteDemo,
  addDemo,
  updateDemo,
} = require('../controllers/demo')

const { ValidationError } = require('../../utils/errors')
const { demoRule } = require('./rules')


const addDemoService = async (demoInfo) => {
  const errs = demoRule.validate(demoInfo)
  if (errs.length) {
    // console.log(errs[0].message)
    return new ValidationError('数据验证不通过')
  }
  return await addDemo(demoInfo)
}

const deleteDemoService = async (id) => {
  return await deleteDemo(id)
}

const updateDemoService = async (id, demoInfo) => {
  return await updateDemo(id, demoInfo)
}

const findDemoByPageService = async (pageInfo) => {
  // if(!pageInfo.current && !pageInfo.pageSize) {
  //   pageInfo = null
  // }
  return await findDemoByPage(pageInfo)
}

const findDemoByIdService = async (id) => {
  return await findDemoById(id)
}

module.exports = {
  addDemoService,
  deleteDemoService,
  updateDemoService,
  findDemoByPageService,
  findDemoByIdService,
}
