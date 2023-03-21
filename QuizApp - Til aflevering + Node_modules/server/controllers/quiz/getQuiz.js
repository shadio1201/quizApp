const database = require('../../utilities/database')
const { validationResult } = require('express-validator');

// Scaffolded user object
const question = {
    post_uuid: null,
    category: null,
    question: null,
    options: null,
    answer: null
  };

const getQuiz = async (req, res) => {

const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: errors.array() });
    }

try {

    const db = database.get()

    const data = await db.collection('quiz').find().toArray();

    res.send(data)
}

catch (err) {
    return res.json({
        error: err
    })
}


}

module.exports = postQuiz