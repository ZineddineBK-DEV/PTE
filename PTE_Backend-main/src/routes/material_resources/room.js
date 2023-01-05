const express = require("express");
const router = express.Router();
const roomCtr = require("../../controllers/material_resources/roomController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  checkAdminMiddleware,
} = require("../../middlewares/checkAdminMiddleware");

router.get("/getRooms", authMiddleware, roomCtr.getAllRooms);
router.get("/search", authMiddleware, roomCtr.searchRoom);
router.post("/add", authMiddleware, checkAdminMiddleware, roomCtr.addRoom);

router.delete(
  "/delete/:id",
  authMiddleware,
  checkAdminMiddleware,
  roomCtr.deleteRoom
);
/**Events Managment ********/
router.get("/events", authMiddleware, roomCtr.getRoomEvents);
router.post("/setevent", authMiddleware, roomCtr.createEvent);
router.patch("/acceptEvent/:id", authMiddleware, roomCtr.updateEvent);
router.delete("/deleteEvent/:id", authMiddleware, roomCtr.deleteEvent);

module.exports = router;
