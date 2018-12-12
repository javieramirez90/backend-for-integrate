const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const Task  = require('./Task.js');

const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [ {type: Schema.Types.ObjectId, ref: Task} ],
},
{
  timestamps:{
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model('Project', projectSchema);