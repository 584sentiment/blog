const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// 友链
// id avatar url nickname intro
// id 头像 地址  昵称  简介
const friendSchema = new Schema({
  id: String,
  avatar: String,
  url: String,
  nickname: String,
  intro: String,
}, {
  versionKey: false
});

const Friend = model('Friend', friendSchema);

module.exports = Friend;