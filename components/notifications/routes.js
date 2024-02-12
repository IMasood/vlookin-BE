const express = require("express");
const router = express.Router();
const notificationController = require('./notificationController')


router.post('/tenant', notificationController.notifyTenant)
router.post('/admin', notificationController.notifyAdmin)

module.exports = router;