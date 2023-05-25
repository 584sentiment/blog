const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const classifySchema = Schema({
  id: String,
  classifyName: String
},{
  versionKey: false
});

const Classify = model("Classify", classifySchema, 'classify');

module.exports = Classify;