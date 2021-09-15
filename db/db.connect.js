const mongoose = require('mongoose');

const dbURI = process.env['dbURI'];

const { quizSchema } = require('../models/quiz.model');
const { leaderboardSchema } = require('../models/leaderboard.model');
const { scoreSchema } = require('../models/score.model');

const dbConnect = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const Quiz = dbConnect.model('quiz', quizSchema)
const Leaderboard = dbConnect.model('leaderboard', leaderboardSchema);
const Score = dbConnect.model('score', scoreSchema);

module.exports = { dbConnect, Quiz, Leaderboard, Score };