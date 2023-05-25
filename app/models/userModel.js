const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  id: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, defalut: '' },
  birth: Date,
  qq: { type: String, defalut: '' },
  wx: { type: String, defalut: '' },
  email: { type: String, defalut: '' },
  github: { type: String, defalut: '' },
  bilibili: { type: String, defalut: '' },
  createTime: { type: String, default: Date.now },
  updateTime: String,
  lastLoginTime : String,
  follows: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  avatar: { type: String, defalut: '' },
  phone: { type: String, defalut: '' },
  gender: { type: Boolean, default: true },
  intro: { type: String, defalut: '' },
  permision: { type: Number, defalut: 1 },
  points: Number,
  enable: Boolean
},{
  versionKey: false
})

const User = model('User', UserSchema);

module.exports = User;