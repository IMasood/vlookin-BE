const express = require("express");
const router = express.Router();
var dataController = require("../controllers/data")

router.get("/",dataController.getData);
router.post("/",dataController.createTenant);

module.exports = router;
