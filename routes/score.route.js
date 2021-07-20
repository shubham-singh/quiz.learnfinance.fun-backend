const express = require('express');
const router = express.Router();

const { getScore ,addScore, changeScore } = require('../controllers/score.controller')

router
.get('/', getScore)
.post('/', addScore)
.post('/change', changeScore)

module.exports = router;