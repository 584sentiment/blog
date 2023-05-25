const mongoose = require('mongoose');

const { Schema, model } = mongoose;


// 评论：
const commentsSchema = new Schema({
  id: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  blogTd: { type: Schema.Types.ObjectId, ref: "Blog" },
  content: String,
  createTime: Date,
  replay: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createDate: Date
  }]
},{
  versionKey: false
});

const Comments = model('Comments', commentsSchema);

module.exports = Comments;