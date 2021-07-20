const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const leaderboardSchema = new Schema({
  quiz_id: {
    type: Schema.Types.ObjectId,
    ref: 'quiz',
    required: [true, 'Quiz ID is required'],
    index: true,
    unique: true
  },
  topScores: [
    {
      user_id: {
        type:  Schema.Types.ObjectId,
        ref: 'user'
      },
      score: {
        type: Number
      }
    }
  ]
}, {timestamps: true});

leaderboardSchema.pre('save', async function(next) {
  this.topScores.sort((first, second) => second.score - first.score)
})

leaderboardSchema.statics.addTopScore = async function(quiz_id ,user_score){
  const quiz = await this.findOne({quiz_id: quiz_id})
  
  if (quiz) {
    const index = quiz.topScores.findIndex(user => user.user_id === user_score.user_id);
    if (index !== -1) {
        quiz.topScores[index].score = user_score.score;
    } 
    else if (quiz.topScores.length === 3 && user_score.score > quiz.topScores[2].score) {
      quiz.topScores.pop();
      quiz.topScores.push(user_score);
    }
    else if (quiz.topScores.length < 3) {
      quiz.topScores.push(user_score);
    } else {}
    await quiz.save();
  } else {
    const newLeaderboard = new this({
      quiz_id,
      topScores: [user_score]
    });
    await newLeaderboard.save();
  }
}

module.exports = { leaderboardSchema }