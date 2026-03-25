const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  originalContent: {
    type: Object, // Can be raw text or structured initial data
    required: true
  },
  optimizedContent: {
    type: Object,
    default: null
  },
  atsScore: {
    type: Number,
    default: 0
  },
  scoreData: {
    type: Object,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
