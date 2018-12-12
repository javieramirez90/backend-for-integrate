const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Project = require('./Project');

const taskSchema = new Schema({
  title: String,
  description: String,
  project: {type: Schema.Types.ObjectId, ref: 'Project'}
}, {
  timestamps: {
    createdAt: true,
    updatedAt:true
  }
});

module.exports = mongoose.model('Task', taskSchema);
