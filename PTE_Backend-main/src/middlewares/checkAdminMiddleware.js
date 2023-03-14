const asyncHandler = require("express-async-handler");

const checkAdminMiddleware = asyncHandler(async (req, res, next) => {
  // try {
  //   const user = res.locals.user;
  //   if (user.roles.includes("admin")) {
  //     next();
  //   } else {
  //     res.status(401);
  //     throw new Error("You are not authorized to access this page");
  //   }
  // } catch (error) {
  //   res.status(401);
  //   throw new Error("You are not authorized to access this page");
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

    if (decoded.roles !== 'admin') {
      return res.status(403).send('Access denied'); // If the user is not an admin, return a 403 status code and a message
    }

    next(); // If the user is an admin and the token is valid, proceed to the next middleware
  });
});

module.exports = { checkAdminMiddleware };
