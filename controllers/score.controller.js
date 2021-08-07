const { Score, Leaderboard } = require('../db/db.connect.js');

const getScore = async (req, res) => {
  try {
    const scores = await Score.findOne({ user_id: req.user.userID })
    if (scores === null) {
      throw new Error("user has not taken any quiz");
    }
    res.status(200).json({
      success: true,
      scores
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const addScore = async (req, res) => {
  try {
    const { quizID, score } = req.body;
    const scores = await Score.findOne({ user_id: req.user.userID })
    if (scores === null) {
      const newScore = new Score({
        user_id: req.user.userID,
        scores: [{quiz_id: quizID, score}]
      });
      const addToLeaderboard = await Leaderboard.addTopScore(quizID, {user_id: req.user.userID, score});

      await newScore.save();

      return res.status(200).json({
        success: true,
        scores: newScore,
        leaderboard: addToLeaderboard
      })
    }

    scores.scores.push({quiz_id: quizID, score});
    const addToLeaderboard = await Leaderboard.addTopScore(quizID, {user_id: req.user.userID, score});
    await scores.save();

    res.status(200).json({
      success: true,
      scores,
      leaderboard: addToLeaderboard
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const changeScore = async (req, res) => {
  try {
    const { quizID, score } = req.body;
    const filter = {
      user_id: req.user.userID,
      'scores.quiz_id': quizID  
    };
    const update = { '$set': { 'scores.$.score': score } };
    const scores = await Score.findOneAndUpdate(filter, update, { new: true });
    const addToLeaderboard = await Leaderboard.addTopScore(quizID, {user_id: req.user.userID, score});
    res.status(200).json({
      success: true,
      scores
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { getScore, addScore, changeScore }