const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const optionSchema = new Schema({
  value: {
    type: String,
    required: [true, 'Option can not be empty']
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false
  }
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question can not be empty']
  },
  options: [optionSchema]
})

const quizSchema = new Schema({
  quizName: {
    type: String,
    required: [true, 'Quiz name is required']
  },
  points: {
    type: Number,
    required: [true, 'Points is required']
  },
  negativePoints: {
    type: Number,
    required: [true, 'Negative points are required']
  },
  questions: [questionSchema]
}, {timestamps: true})

module.exports = { quizSchema }