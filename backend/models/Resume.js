const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalContent: { type: String, required: true },
  jobDescription: { type: String, required: true },
  optimizedContent: { type: Object }, // JSON structure
  atsScore: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', resumeSchema);
