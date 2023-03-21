const database = require('../../utilities/database')
const crypto = require("crypto");
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");


const signin = async (req, res) => {

const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: errors.array() });
    }

try {

    const db = database.get()

    //check if user is already in database
    const user = await db.collection('Users').findOne({ email: req.body.email });

    if(user && await bcrypt.compare(req.body.password, user.password)) {

        const profile = { uuid: user.uuid, username: user.username }

        const accessToken = jwt.sign(profile, process.env.JWT_AUTH)

        const refreshToken = jwt.sign(
            { type: "refresh",
                ...profile
            },
            process.env.JWT_REFRESH,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES,
            }
        )

        // Insert refresh token into database
        const insertRefresh = await db.collection("tokens").replaceOne(
        { type: "refresh", user: user.uuid },
        {
          type: "refresh",
          user: user.uuid,
          token: refreshToken,
        },
        {
          upsert: true,
        }
      );

      if (!insertRefresh) {
        return res.json({
          error: "Failed to signin",
        });
      }

        return res.json({
            accessToken,
            refreshToken,
            profile
        })
    } else {
        return res.json({
            error: "Email or password is incorrect"
        })
    }

} catch (err) {
    return res.json({
        error: err
    })
}


}

module.exports = signin