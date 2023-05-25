const mongoose = require('mongoose');

const { Schema, model } = mongoose;


// 博客
// id 标签 分类 浏览量 点赞 标题 内容 作者 创建日期 上次修改日期 审核状态
const blogSchema = new Schema({
  id: String,
  classifyId: { type: Schema.Types.ObjectId, ref: "Classify" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tagId: { type: Schema.Types.ObjectId, ref: "Tag" },
  commentsId: [{type: Schema.Types.ObjectId, ref: 'Comments'}],
  title: String,
  content: String,
  author: String,
  browseNum: Number,
  likes: Number,
  createDate: Date,
  updateDate: Date,
  enable: {type:Boolean, default: false}
}, {
  versionKey: false
});

const Blog = model('Blog', blogSchema);
module.exports = Blog;