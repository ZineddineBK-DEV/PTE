const express = require("express");
const router = express.Router();
const userCtr = require("../controllers/userController");
router.post("", userCtr.login);

module.exports = router;
