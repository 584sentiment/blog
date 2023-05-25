const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const tagSchema = Schema({
  id: String,
  tagName: String
}, {
  versionKey: false,
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;