const express = require("express");
const router = express.Router();
const userController = require("../users/controllers/userController.js")

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.patch('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router;