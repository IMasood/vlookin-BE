let Tenant = require("../model/tenantSchema");

async function create({
  tenantName,
  email,
  buildingName,
  flatNo,
  contact,
  officeNo,
  nationality,
}) {
  try {
    console.log("In POST DAL", email);
    let addTenant = await Tenant.create({
      tenantName,
      email,
      buildingName,
      flatNo,
      contact,
      officeNo,
      nationality,
    });
    console.log(addTenant);
    return {
      status: 200,
      data: addTenant,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
}

async function getData() {
  try {
    let data = await Tenant.find();
    return {
      status: 200,
      data: data,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
}

module.exports = {
  create,
  getData,
};
