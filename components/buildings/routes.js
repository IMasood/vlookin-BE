const express = require("express");
const router = express.Router();
const buildingController = require('./buildingController')

router.post('/', buildingController.createBuilding)
router.get('/', buildingController.getBuilding)
module.exports = router