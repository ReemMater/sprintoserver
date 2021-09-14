const mongoose = require('mongoose');

const SprintsSchema = mongoose.Schema({
  proname: {
    type: String,
    required: true,
  },
  sprintname: {
    type: String,
    required: true,
  },
  sprintdescription: {
    type: String,
    required: true,
  },
  sprintsummary: {
    type: String,
    required: true,
  },
  sprintstartdate: {
    type: String,
    required: true,
  },
  sprintenddate: {
    type: String,
    required: true,
  },
  sprintstates: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('sprints', SprintsSchema);
