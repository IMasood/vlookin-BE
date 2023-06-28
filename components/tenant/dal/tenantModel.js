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
    let addTenant = await Tenant.create({
      tenantName,
      email,
      buildingName,
      flatNo,
      contact,
      officeNo,
      nationality,
    });
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

async function getTenant({id,email}) {
  try {

    let where ={};
    if (id) {
      where._id = id
    }
    if (email) {
      where.email = email
    }
    let data = await Tenant.find(where);
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

async function updateTenant({
  id,
  tenantName,
  email,
  buildingName,
  flatNo,
  contact,
  officeNo,
  nationality,
}) {
  try {
    let updatedTenant = await Tenant.findOneAndUpdate(
      { _id: id.id },
      {
        tenantName,
        email,
        buildingName,
        flatNo,
        contact,
        officeNo,
        nationality,
      }
    );
    return updatedTenant;
  } catch (err) {
    throw err;
  }
}

async function deleteTenant({id}) {
  try {
    let response = await Tenant.findOneAndDelete({
      _id: id,
    });
    return response
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
