const mongoose = require('mongoose');

const SubtasksSchema = mongoose.Schema({
  sprname: {
    type: String,
    required: true,
  },
  subtaskname: {
    type: String,
    required: true,
  },
  subtaskdescription: {
    type: String,
    required: true,
  },
  subtasksummary: {
    type: String,
    required: true,
  },
  subtaskpriority: {
    type: String,
    required: true,
  },
  subtaskassignee: {
    type: String,
    required: true,
  },
  subtaskreporter: {
    type: String,
    required: true,
  },
  subtaskstartdate: {
    type: String,
    required: true,
  },
  subtaskenddate: {
    type: String,
    required: true,
  },
  subtaskprogress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('subtasks', SubtasksSchema);
