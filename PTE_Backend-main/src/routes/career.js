const express = require("express");
const router = express.Router();
const careerCtr = require("../controllers/careerController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { checkAdminMiddleware } = require("../middlewares/checkAdminMiddleware");

router.get("/getAllCareers",checkAdminMiddleware,authMiddleware,careerCtr.getCareers);
router.get("/getUserCareer/:id",checkAdminMiddleware,authMiddleware,careerCtr.getUserCareer);
router.put("/updateCareer/:id",checkAdminMiddleware,authMiddleware,careerCtr.updateCareer);

module.exports = router;
