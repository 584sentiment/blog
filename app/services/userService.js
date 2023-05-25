const { userRule } = require('./rules');

const md5 = require('md5');
const jwt = require('jsonwebtoken');

const {
  findUserById,
  findUserByUsername,
  addUser,
  deleteUser,
  updateUser,
  userLogin,
  findTopTenUsersByPoints
} = require('../controllers/user');

const { randomAvatar } = require("../../utils/tools");
const { ValidationError } = require("../../utils/errors");



// const findTopTenUsersByPointsService = async () => {
//   return await findTopTenUsersByPoints();
// }
const loginService = async (loginInfo) => {
  console.log(loginInfo, 'login service')
  loginInfo.password = md5(loginInfo.password);
  let data = await userLogin(loginInfo);
  // console.log(data);
  if (data) {
    // 用户是否被禁用
    if (!data.enable) {
      return {
        data: {
          _id: data._id,
          username: data.username,
          enable: data.enable
        }
      }
    };
    // 添加token
    data = {
      _id: data._id,
      username: data.username,
      enable: data.enable
    }
    let loginPeriod = 1;
    if (loginInfo.rememmber) {
      loginPeriod = process.env.LOGIN_PERIOD;
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * loginPeriod,
    });

    return {
      data,
      token,
    };
  }
  return {
    data
  }
}

const keys = [
  'birth',
  'qq',
  'wx',
  'email',
  'github',
  'bilibili',
  'phone',
  'intro'
]

// 添加用户
const addUserService = async (userInfo) => {
  console.log(userInfo)
  const res = await userRule.validate(userInfo);
  // console.log(res)
  // 说明验证通过
  if (!res.length) {
    if (!userInfo.password) {
      userInfo.password = md5(process.env.USER_PASSWORD);
    } else {
      userInfo.password = md5(userInfo.password);
    }
    userInfo.follows = [];
    userInfo.blogs = [];
    userInfo.createTime = Date.now();
    userInfo.nickname = userInfo.nickname || process.env.USER_NICKNAME + userInfo.createTime.toString().split('').reverse().slice(0, 6).join('');
    userInfo.avatar = await randomAvatar();
    userInfo.lastLoginTime = userInfo.createTime;
    userInfo.updateTime = userInfo.createTime;
    userInfo.gender = true;
    userInfo.permission = process.env.USER_PERMISSION;
    userInfo.points = 0;
    userInfo.enable = true;
    keys.forEach(key => userInfo[key] = '');
    // console.log(userInfo, 'userService')
    return await addUser(userInfo);
  }
  return new ValidationError("数据验证失败");
}


// 删除用户
const deleteUserService = async (id) => {
  return await deleteUser(id);
}


// 查找用户
const findUserByIdService = async (id) => {
  return await findUserById(id);
}

// 更新用户
const updateUserService = async (id, info) => {
  const userInfo = await findUserById(id);
  if (info.password) {
    const pwd = md5(info.password);
    if (userInfo.password !== pwd) {
      info.password = pwd;
    }
  }
  return await updateUser(id, info);
}


// 用户是否存在
const isUserExistService = async (username) => {
  console.log(username)
  const data = await findUserByUsername(username);
  return data.length === 1;
}

// 验证密码是否正确，前端可能会拿到用户的密码，但是是经过md5加密的，所以应该再后端验证
const isPwdValid = async ({ username, password }) => {
  const userInfo = await findUserByUsername(username);
  return userInfo.username === md5(password)
}

module.exports = {
  loginService,
  addUserService,
  deleteUserService,
  findUserByIdService,
  updateUserService,
  isUserExistService,
  findTopTenUsersByPointsService: findTopTenUsersByPoints,
  isPwdValid
}