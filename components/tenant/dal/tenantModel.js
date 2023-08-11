let Tenant = require("../model/tenantSchema");

async function create({
  tenantName,
  email,
  buildingId,
  flatNo,
  contact,
  officeNo,
  createdBy,
  password,
  nationality,
  OTP_Expiry,
  OTP,
}) {
  try {
    let addTenant = await Tenant.create({
      tenantName,
      email,
      buildingId,
      flatNo,
      contact,
      officeNo,
      nationality,
      createdBy,
      password,
      OTP_Expiry,
      OTP,
    });
    return ({data: addTenant, status:200});
  } catch (err) {
    throw err;
  }
}

async function getTenant({ id, email, all }) {
  try {
    let where = {};
    let data;
    if (id) {
      where._id = id;
    }
    if (email) {
      where.email = email;
    }
    if (all) {
      data = await Tenant.find(where).populate("buildingId", [
        "buildingName",
        "buildingCode",
      ]);
      return data;
    }
    data = await Tenant.findOne(where).populate("buildingId" , ["buildingName","buildingCode"]);
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateTenant({
  id,
  tenantName,
  email,
  buildingName,
  flatNo,
  contact,
  officeNo,
  nationality,
  OTP_Verified,
  OTP,
  OTP_Expiry,
}) {
  try {
    let updatedTenant = await Tenant.findOneAndUpdate(
      { _id: id },
      {
        tenantName,
        email,
        buildingName,
        flatNo,
        contact,
        officeNo,
        nationality,
        OTP_Verified,
        OTP,
        OTP_Expiry,
      }
    );

    if (updatedTenant === null) {
      throw Error("Tenant Not Found")
    }

    return updatedTenant;
  } catch (err) {
    throw err;
  }
}

async function deleteTenant({ id }) {
  try {
    let response = await Tenant.findOneAndDelete({
      _id: id,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  getTenant,
  updateTenant,
  deleteTenant,
};
