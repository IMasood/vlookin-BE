const express = require("express");
const router = express.Router();
const receiptController = require("./receiptController");

router.post("/", receiptController.createReceipt);
router.get("/", receiptController.getReceipt);
router.patch("/", receiptController.updateReceipt);
router.delete("/", receiptController.deleteReceipt);
module.exports = router;
