const express = require('express');
const router = express.Router();

router.post('/postQuiz', require('../controllers/quiz/postQuiz'))

module.exports = router