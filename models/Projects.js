const mongoose = require('mongoose');

const ProjectsSchema = mongoose.Schema({
  projectname: {
    type: String,
    required: true,
  },
  projectdescription: {
    type: String,
    required: true,
  },
  projectsummary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('projects', ProjectsSchema);
