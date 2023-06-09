const express = require("express");
const router = express.Router();
const visitorController = require('./visitorControllers')


router.post('/createVisit', visitorController.createVisit )
router.get('/', visitorController.getVisit)
router.patch('/', visitorController.updateVisit)
router.delete('/', visitorController.deleteVisit)

module.exports = router;