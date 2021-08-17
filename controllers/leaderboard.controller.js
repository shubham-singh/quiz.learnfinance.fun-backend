const { Leaderboard } = require('../db/db.connect.js');

const getAllLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({}).populate({
      path: "quiz_id",
      select: "quizName"
    }).populate("topScores.user_id");
    res.status(200).json({
      success: true,
      leaderboard
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const getLeaderboard = async (req, res) => {
  try {
    const { quizID } = req;
    const leaderboard = await Leaderboard.findOne({
      quiz_id: quizID
    });
    if (leaderboard === null) {
      return res.status(200).json({
        success: true,
        leaderboard: {
          quiz_id: quizID,
          topScores: []
        }
      })
    }
    res.status(200).json({
      success: true,
      leaderboard
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { getLeaderboard, getAllLeaderboard }