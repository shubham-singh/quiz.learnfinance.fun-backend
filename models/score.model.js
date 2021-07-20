const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const quizScoreSchema = new Schema({
  quiz_id: {
    type: Schema.Types.ObjectId,
    ref: 'quiz',
    required: [true, 'Quiz ID is required']
  },
  score: {
    type: Number,
    default: 0
  }
})

const scoreSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  },
  scores: [quizScoreSchema]
}, {timestamps: true})

module.exports = { scoreSchema }