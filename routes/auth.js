const express = require("express");
const router = express.Router();
var authController = require("../controllers/auth");

router.post("/createUser", authController.createUser);
router.post("/login", authController.login);

module.exports = router;
