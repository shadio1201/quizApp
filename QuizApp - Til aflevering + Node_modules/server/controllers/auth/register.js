const database = require('../../utilities/database')
const crypto = require("crypto");
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

// Scaffolded user object
const USER = {
    uuid: null,
    username: null,
    email: null,
    password: null,
  };

const register = async (req, res) => {

const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: errors.array() });
    }

const user = {
    ...USER,
    ...req.body,
    uuid: crypto.randomUUID()
}

try {

    const db = database.get()

    //check if user is already in database
    const duplicates = await db.collection('Users').findOne({ email: user.email });

    if(duplicates) {
        return res.json({
            error: 'E-mail is already in use'
        })
    }

    user.password = await bcrypt.hash(user.password, 10);

    await db.collection('Users').insertOne(user)

    res.send({
        message: `${user.email} was succesfully registered`
    })
}

catch (err) {
    return res.json({
        error: err
    })
}


}

module.exports = register