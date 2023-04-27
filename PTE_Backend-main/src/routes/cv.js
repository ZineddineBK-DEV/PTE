const express = require("express");
const router = express.Router();
const cvCtr = require("../controllers/cvController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.patch("/update/:id", cvCtr.updateCv);
router.delete("/delete-item/:id/:arrayName/:itemId", cvCtr.deleteElement);
router.post("/filter", authMiddleware, cvCtr.filterCvs);
router.post("/search", cvCtr.searchCvs);


module.exports = router;
