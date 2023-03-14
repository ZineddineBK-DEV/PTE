const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const authMiddleware = asyncHandler(async (req, res, next) => {
  // let token;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   try {
  //     // Get token from header
  //     token = req.headers.authorization.split(" ")[1];

  //     // Verify token
  //     const decoded = jwt.verify(token, "secret_this_should_be_longer");

  //     // Get user from the token
  //     req.user = await User.findById(decoded.id);
  //     res.locals.user = req.user;
  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error("Not authorized");
  //   }
  // }

  // if (!token) {
  //   res.status(401);
  //   throw new Error("Not authorized, no token");
  // }
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the authorization header

  if (!token) {
    return res.status(401).send('Access token not found'); // If no token is provided, return a 401 status code and a message
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid access token'); // If the token is invalid, return a 401 status code and a message
    }

    req.user = decoded; // Attach the decoded user information to the request object
    next();
})});

module.exports = { authMiddleware };
