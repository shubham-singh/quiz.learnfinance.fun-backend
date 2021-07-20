const { Quiz } = require('../db/db.connect.js');

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.find({});
    res.status(200).json({
      success: true,
      quiz
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const addQuiz = async (req, res) => {
  try {
    const quiz = req.body;
    const NewQuiz = new Quiz(quiz);
    const savedQuiz = await NewQuiz.save();

    res.status(200).json({
      success: true,
      quiz: savedQuiz
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { addQuiz, getQuiz }