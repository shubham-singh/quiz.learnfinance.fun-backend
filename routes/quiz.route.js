const express = require('express');
const router = express.Router();

const { getQuiz, getAllQuiz, addQuiz } = require('../controllers/quiz.controller.js');

router.param('quizID', (req, res, next, id) => {
  try {
    req.quizID = id;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "quiz not found"
    })
  }
})

router
.get('/:quizID', getQuiz)
.get('/', getAllQuiz)
.post('/add', addQuiz)

module.exports = router;