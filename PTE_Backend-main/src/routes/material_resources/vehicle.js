const express = require("express");
const router = express.Router();
const vehicleCtr = require("../../controllers/material_resources/vehicleController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  checkAdminMiddleware,
} = require("../../middlewares/checkAdminMiddleware");
router.get("/getVehicles", authMiddleware, vehicleCtr.getAllVehicles);
router.post(
  "/addVehicle",
  authMiddleware,
  checkAdminMiddleware,
  vehicleCtr.addVehicle
);

router.delete(
  "/deleteVehicle/:id",
  authMiddleware,
  checkAdminMiddleware,
  vehicleCtr.deleteVehicle
);

router.patch(
  "/update/:id",
  
  authMiddleware,checkAdminMiddleware,
  vehicleCtr.UpdateVehicle
);

router.get("/search", authMiddleware, vehicleCtr.searchVehicle);
/**Events Managment ********/
router.get("/events", authMiddleware, vehicleCtr.getVehicleEvents);
router.post("/setevent", authMiddleware, vehicleCtr.createEvent);
router.patch("/acceptEvent/:id", authMiddleware, vehicleCtr.updateEvent);
router.delete("/deleteEvent/:id", authMiddleware, vehicleCtr.deleteEvent);

module.exports = router;