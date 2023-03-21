const database = require('../../utilities/database')
const crypto = require("crypto");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const signout = async (req, res) => {

try {

    const db = database.get()

    // Delete user providede refresh token
    const tokenDelete = await db
      .collection("tokens")
      .deleteOne({ token: req.body.token, type: "refresh" });

    // If no token was deleted from database, return error to user
    if (!tokenDelete.acknowledged || !tokenDelete.deletedCount) {
      return res.json({
        error: "Failed to log out",
      });
    }

    return res.json({
        message: "Logged out"
    })

} catch (err) {
    return res.json({
        error: err
    })
}


}

module.exports = signout