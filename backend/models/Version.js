const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  content: { type: Object, required: true },
  atsScore: { type: Number },
  jobDescription: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Version', versionSchema);
