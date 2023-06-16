const express = require("express");
const router = express.Router();
const visitorController = require('./visitorControllers')


router.post('/createVisit', visitorController.createVisit )
router.get('/', visitorController.getVisit)

module.exports = router;