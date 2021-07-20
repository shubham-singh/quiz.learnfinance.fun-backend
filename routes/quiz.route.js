const express = require('express');
const router = express.Router();

const { getQuiz, addQuiz } = require('../controllers/quiz.controller.js');

router
.get('/', getQuiz)
.post('/add', addQuiz)

module.exports = router;