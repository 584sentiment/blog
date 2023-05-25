const Schema = require('validate');

const { findUserByUsername } = require('../controllers/user');

const adminRule = new Schema({
  username: {
    type: String,
    required: true,
    length: { min: 6, max: 32 }
  },
  password: {
    required: true,
    type: String
  },
  permission: {
    required: true,
    type: Number
  }
});

// 采用快速注册模式，会自动初始化密码和昵称
const userRule = new Schema({
  username: {
    required: true,
    type: String,
  },
});

// password: {
//   required: true,
//   type: String,
// },
// nickname: {
//   required: true,
//   type: String,
// }

// userRule.validator.isUserExist = async (username) => {
//   const userInfo = await findUserByUsername(username);
//   if (userInfo.length) {
//     return '该用户名已注册！';
//   }
// }

const blogRule = new Schema({
  classifyId: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String
  },
  tagId: {
    required: true,
    type: String
  },
  commentsId: {
    type: Array,
    each: {
      type: String
    }
  },
  title: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  },
});

const classifyRule = new Schema({
  classifyName: {
    required: true,
    type: String
  }
});

const tagRule = new Schema({
  tagName: {
    required: true,
    type: String
  }
});

const commentsRule = new Schema({
  userId: {
    required: true,
    type: String
  },
  blogTd: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  },
});


const demoRule = new Schema({
  tagId: {
    required: true,
    type: String
  },
  classifyId: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  desc: {
    required: true,
    type: String
  },
  url: {
    required: true,
    type: String
  },
});

const friendRule = new Schema({
  avatar: {
    required: true,
    type: String
  },
  url: {
    required: true,
    type: String
  },
  nickname: {
    required: true,
    type: String
  },
});


module.exports = {
  userRule,
  tagRule,
  classifyRule,
  demoRule,
  blogRule,
  commentsRule,
  friendRule
}
