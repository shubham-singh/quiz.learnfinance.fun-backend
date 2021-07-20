const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quiz.route');
const leaderboardRoutes = require('./routes/leaderboard.route');
const scoreRoutes = require('./routes/score.route');
const authRoutes = require('./routes/auth.route');
const { checkUser } = require('./middleware/auth.middleware.js');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Learn Finance API'
  })
})

app.use('/quiz', quizRoutes);

app.use('/leaderboard', leaderboardRoutes);

app.use('/user', authRoutes);

app.use(checkUser);

app.use('/score', scoreRoutes);

app.listen(process.env.PORT || 3000, '0.0.0.0');