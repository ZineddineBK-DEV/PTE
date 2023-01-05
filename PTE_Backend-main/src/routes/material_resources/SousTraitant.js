const express = require("express");
const router = express.Router();
const SousTraitantCtr = require("../../controllers/material_resources/SousTraitant");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  checkAdminMiddleware,
} = require("../../middlewares/checkAdminMiddleware");
router.get("/getExternal", authMiddleware, SousTraitantCtr.getAllSousTraitant);

router.post(
  "/addExternal",
  authMiddleware,
  checkAdminMiddleware,
  SousTraitantCtr.addSousTraitant
);

router.delete(
  "/deleteExternal/:id",
  authMiddleware,
  checkAdminMiddleware,
  SousTraitantCtr.deleteSousTraitant
);

router.get("/search", authMiddleware, SousTraitantCtr.searchSousTraitant);
/**Events Managment ********/
router.get("/events", authMiddleware, SousTraitantCtr.getSousTraitantEvents);
router.post("/setevent", authMiddleware, SousTraitantCtr.createEvent);
router.patch("/acceptEvent/:id", authMiddleware, SousTraitantCtr.updateEvent);
router.delete("/deleteEvent/:id", authMiddleware, SousTraitantCtr.deleteEvent);

module.exports = router;
