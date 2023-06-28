const express = require("express");
const router = express.Router();
var tenantController = require("./controllers/tenantController");

router.get("/", tenantController.getTenant);
router.post("/", tenantController.createTenant);
router.patch("/", tenantController.updateTenant);
router.delete("/", tenantController.deleteTenant);

module.exports = router;
