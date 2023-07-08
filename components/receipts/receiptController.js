const receiptModel = require("./receiptModel");
const code_generator = require("../../services/code_generator");
async function createReceipt(req, res) {
  try {
    let {
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    } = req.body;

    // let buildingCode = code_generator.buildingCode(buildingName);
    let newReceipt = await receiptModel.addReceipt({
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    });
    res.send({
      status: 200,
      message: "Receipt successfully added",
      data: newReceipt,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function getReceipt(req, res) {
  try {
    let { all, id } = req.query;
    let result = await receiptModel.getReceipt({ all, id });

    res.status(200).send({
      status: 200,
      message: "Receipt Data Fetched Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}
async function updateReceipt(req, res) {
  try {
    let { id } = req.query;
    let {
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    } = req.body;

    let updatedReceipt = await receiptModel.updateReceipt({
      id,
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    });
    return res.status(200).send({
      message: "Receipt Updated Succesfully",
      status: 200,
      data: updatedReceipt,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}
async function deleteReceipt(req, res) {
  try {
    let { id } = req.query;

    let deleteReceipt = await receiptModel.deleteReceipt({ id });
    return res.status(200).send({
      message: "Receipt Deleted Successfully",
      status: 200,
      data: deleteReceipt,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

module.exports = {
  createReceipt,
  getReceipt,
  updateReceipt,
  deleteReceipt,
};
