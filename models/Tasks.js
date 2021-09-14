const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
  sprname: {
    type: String,
    required: true,
  },
  taskname: {
    type: String,
    required: true,
  },
  taskdescription: {
    type: String,
    required: true,
  },
  tasksummary: {
    type: String,
    required: true,
  },
  taskpriority: {
    type: String,
    required: true,
  },
  taskassignee: {
    type: String,
    required: true,
  },
  taskreporter: {
    type: String,
    required: true,
  },
  taskstartdate: {
    type: String,
    required: true,
  },
  taskenddate: {
    type: String,
    required: true,
  },
  taskprogress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('tasks', TasksSchema);
