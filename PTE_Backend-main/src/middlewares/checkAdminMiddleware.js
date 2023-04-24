const asyncHandler = require("express-async-handler");

const checkAdminMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (user.roles.includes("admin")) {
      next();
    } else {
      res.status(401);
      throw new Error("You are not authorized to access this page");
    }
  } catch (error) {
    res.status(401);
    throw new Error("You are not authorized to access this page");
  }})


module.exports = { checkAdminMiddleware };
