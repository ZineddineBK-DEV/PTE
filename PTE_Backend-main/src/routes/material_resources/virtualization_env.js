const express = require("express");
const router = express.Router();
const virtualizationEnvCtr = require("../../controllers/material_resources/virtualizationEnvController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.get("/getVirtsEnv",authMiddleware, virtualizationEnvCtr.getAllVirtsEnv);
router.post("/addaddVirtEnv",authMiddleware, virtualizationEnvCtr.addVirtEnv);
router.get("/getVirtEnv/:id",authMiddleware, virtualizationEnvCtr.getVirtEnvById);
router.delete("/deleteVirtEnv/:id",authMiddleware, virtualizationEnvCtr.deleteVirtEnv);

module.exports = router;
