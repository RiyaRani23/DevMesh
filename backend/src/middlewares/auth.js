// Middleware is a function that runs before the actual request handler 
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Middleware to authenticate user using JWT token
const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET); // verify token

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    req.user = user;
    next(); // to move to the req handler
  }
  catch (err) {
    res.status(401).send("Unauthorized : " + err.message);
  }
};
console.log("JWT_SECRET:", process.env.JWT_SECRET);


module.exports = {
  userAuth,
};