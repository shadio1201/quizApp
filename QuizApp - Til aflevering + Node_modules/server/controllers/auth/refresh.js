const database = require("../../utilities/database");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // Get jwt from request body
  if (!req.body.token) {
    return res.json({
      message: "Missing jwt",
    });
  }

  try {
    // Get database connection
    const db = database.get();

    // Find token in database
    const token = await db
      .collection("tokens")
      .findOne({ token: req.body.token });

    // If given token doesnt exist or type is not refresh, return error
    if (!token || !(token.type == "refresh")) {
      return res.json({
        error: "The token provided is not valid",
      });
    }

    // Extract data from jwt
    const tokenData = jwt.verify(token.token, process.env.JWT_REFRESH);

    // If token is invalid
    if (!tokenData) {
      // Delete token from database
      await db.collection("tokens").deleteOne({ token: req.body.token });

      // Return error
      return res.json({
        error: "The token provided has expired, please signin again",
      });
    }

    // Find user in database
    const user = await db.collection("users").findOne({ uuid: tokenData.uuid });

    delete user.password;
    delete user._id;

    // Create new accessToken
    const accessToken = jwt.sign(
      {
        type: "access",
        ...user,
      },
      process.env.JWT_AUTH,
      {
        expiresIn: process.env.JWT_AUTH_EXPIRES,
      }
    );

    // Return user data, accessToken and refreshToken to requesting user
    res.json({
      accessToken,
      refreshToken: req.body.token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};