const express = require('express');
const router = express.Router();

const { getLeaderboard, getAllLeaderboard } = require('../controllers/leaderboard.controller');

router.param('quizID', (req, res, next, id) => {
  try {
    req.quizID = id;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "could not retrieve quiz leaderboard"
    })
  }
})

router
.get('/:quizID', getLeaderboard)
.get('/', getAllLeaderboard)

module.exports = router;