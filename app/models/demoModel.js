const mongoose = require('mongoose');

const { Schema, model } = mongoose;


// demo 表结构
// id 标题 预览图 描述 项目地址 标签 分类 访问量 点赞
const demoSchema = new Schema({
  id: String,
  tagId: { type: Schema.Types.ObjectId , ref: "Tag"},
  classifyId: { type: Schema.Types.ObjectId , ref: "Classify"},
  title: String,
  content: String,
  thumb: [String],
  desc: String,
  url: String,
  browseNum: Number,
  likes: Number
},{
  versionKey: false
});

const Demo = model('Demo', demoSchema);

module.exports = Demo;