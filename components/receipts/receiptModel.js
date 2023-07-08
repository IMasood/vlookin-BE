const Receipt = require("./receiptSchema");

async function addReceipt({
  buildingId,
  parkingPrice,
  flatNo,
  periodOfContract,
  receiptDetails,
  total,
  duration,
  tenantAccount,
}) {
  try {
    let newReceipt = Receipt.create({
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    });

    return newReceipt;
  } catch (err) {
    throw err;
  }
}

async function getReceipt({ all, id }) {
  try {
    let where = {};
    let response;
    if (all) {
      response = await Receipt.find().populate('tenantAccount');
      return response;
    }
    if (id) {
      where._id = id;
    }
    response = await Receipt.findOne(where).populate('tenantAccount');
    return response;
  } catch (err) {
    throw err;
  }
}
async function updateReceipt({
  id,
  buildingId,
  parkingPrice,
  flatNo,
  periodOfContract,
  receiptDetails,
  total,
  duration,
  tenantAccount,
}) {
  try {
    let response = await Receipt.findOneAndUpdate(
      { _id: id },
      {
        buildingId,
        parkingPrice,
        flatNo,
        periodOfContract,
        receiptDetails,
        total,
        duration,
        tenantAccount,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteReceipt({ id }) {
  try {
    let response = await Receipt.findOneAndDelete({ _id: id });
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addReceipt,
  getReceipt,
  updateReceipt,
  deleteReceipt,
};
