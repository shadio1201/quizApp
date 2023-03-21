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

const postQuiz = async (req, res) => {

const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: errors.array() });
    }

const questionToPost = {
    ...question,
    ...req.body,
    post_uuid: req.body.uuid 
}

try {

    const db = database.get()



    //check if user is already in database
    const duplicate = await db.collection('quiz').findOne({ question: questionToPost.question });

    if(duplicate) {
        return res.json({
            error: 'Question already in database. Please come up with a different question'
        })
    }

    await db.collection('quiz').insertOne(questionToPost)

    res.send({
        message: `Your question was succesfully registered`
    })
}

catch (err) {
    return res.json({
        error: err
    })
}


}

module.exports = postQuiz