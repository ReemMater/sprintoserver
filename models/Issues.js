const mongoose = require('mongoose');

const IssuesSchema = mongoose.Schema({
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sprints',
  },
  issuename: {
    type: String,
    required: true,
  },
  issuedescription: {
    type: String,
    required: true,
  },
  issuesummary: {
    type: String,
    required: true,
  },
  issuepriority: {
    type: String,
    required: true,
  },
  issueassignee: {
    type: String,
    required: true,
  },
  issuereporter: {
    type: String,
    required: true,
  },
  issuestartdate: {
    type: String,
    required: true,
  },
  issueenddate: {
    type: String,
    required: true,
  },
  issueprogress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('issues', IssuesSchema);
