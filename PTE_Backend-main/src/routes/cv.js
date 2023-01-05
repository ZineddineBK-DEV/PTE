const express = require("express");
const router = express.Router();
const cvCtr = require("../controllers/cvController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.patch("/update/:id", cvCtr.updateCv);
router.patch("/delete-item/:id", cvCtr.deleteElement);
router.post("/filter", authMiddleware, cvCtr.filterCvs);
router.post("/search", authMiddleware, cvCtr.searchCvs);


module.exports = router;
