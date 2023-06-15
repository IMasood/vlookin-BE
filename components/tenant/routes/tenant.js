const express = require("express");
const router = express.Router();
var tenantController = require("../controllers/tenantController");

router.get("/", tenantController.getTenant);
router.post("/", tenantController.createTenant);

module.exports = router;
