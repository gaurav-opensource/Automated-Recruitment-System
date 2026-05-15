const mongoose = require('mongoose');

const applicationProgressSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  name: String,
  email: String,
  resumeLink: String,

  resumeScore: Number,

  testLink: { type: String },
  testToken: { type: String },
  testStartTime: Date,
  testEndTime: Date,
  testEmailSentAt: Date,
  testCompleted: { type: Boolean, default: false },         

  score: { type: Number, default: 0 },   
  correct: { type: Number, default: 0 }, 
  total: { type: Number, default: 0 },  

  testScore: Number,
  contacted: { type: Boolean, default: false },

  currentStage: {
    type: String,
    enum: ['resume', 'coding', 'interview', 'final', 'rejected'],
    default: 'resume'
  },

  isShortlisted: { type: Boolean, default: false }
}, { timestamps: true });

applicationProgressSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('ApplicationProgress', applicationProgressSchema);
