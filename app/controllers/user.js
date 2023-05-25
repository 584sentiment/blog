const userModel = require('../models/userModel');

// 只负责数据和数据库的交互，怎删改查

/**
 * 
 * @param {*} param0 用户登录实际上是查询数据库中有没有对应的用户信息
 * @returns 
 */
const userLogin = async ({username, password}) => {
  return await userModel.findOne({username, password});
}

/**
 * 添加一个用户
 * @param {*} userInfo 新用户信息
 * @returns 
 */
const addUser = async (userInfo) => {
  return await userModel.create(userInfo);
}

/**
 * 删除一个用户
 * @param {*} id 要删除的用户id
 * @returns 
 */
const deleteUser = async (id) => {
  return await userModel.deleteOne({_id: id});
}

/**
 * 根据id查找用户
 * @param {*} id 要查找的用户id
 * @returns 
 */
const findUserById = async (id) => {
  return await userModel.findOne({_id: id});
}

/**
 * 修改id用户的信息
 * @param {*} id 要修改信息的用户id
 * @param {*} info 要修改的信息
 * @returns 
 */
const updateUser = (id, info) => {
  return userModel.updateOne({_id: id}, info)
}

/**
 * 根据用户名查找用户
 * @param {*} username 要查找的用户名
 * @returns 
 */
const findUserByUsername = async (username) => {
  return await userModel.find({username});
}

/**
 * 查找活跃前十的用户，活跃度相同按注册时间降序
 * @returns 用户信息数组
 */
const findTopTenUsersByPoints = async () => {
  return await userModel.find().sort({points: -1, createTime: -1}).limit(10);
}

module.exports = {
  userLogin,
  addUser,
  deleteUser,
  findUserById,
  updateUser,
  findUserByUsername,
  findTopTenUsersByPoints
}