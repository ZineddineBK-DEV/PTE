const express = require("express");
const router = express.Router();
const vehicleCtr = require("../../controllers/material_resources/vehicleController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  checkAdminMiddleware,
} = require("../../middlewares/checkAdminMiddleware");
router.get("/getVehicles",  vehicleCtr.getAllVehicles);
router.post(
  "/addVehicle",
 
  vehicleCtr.addVehicle
);

router.delete(
  "/deleteVehicle/:id",
  
  vehicleCtr.deleteVehicle
);

router.get("/search",  vehicleCtr.searchVehicle);
/**Events Managment ********/
router.get("/events",  vehicleCtr.getVehicleEvents);
router.post("/setevent",  vehicleCtr.createEvent);
router.patch("/acceptEvent/:id",  vehicleCtr.updateEvent);
router.delete("/deleteEvent/:id",  vehicleCtr.deleteEvent);

module.exports = router;
