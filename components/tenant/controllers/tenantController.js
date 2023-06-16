var Tenant = require("../dal/tenantModel");

async function createTenant(req, res) {
  try {
    let {
      tenantName,
      email,
      buildingName,
      flatNo,
      contact,
      officeNo,
      nationality,
    } = req.body;
    console.log("In POST COntroller");

    let response = await Tenant.create({
      tenantName,
      email,
      buildingName,
      flatNo,
      contact,
      officeNo,
      nationality,
    });
    if (response.status == 200) {
      res.status(200).send({
        message: "Tenant created successfully",
        status: 200,
        data: response,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: ("Failed to add Tenant", err.message),
      status: 500,
    });
  }
}

async function getTenant(req, res) {
  try {
    let response = await Tenant.getData();
    console.log(response);
    if (response.status === 200) {
      res.status(200).send({
        message: "Data fetched successfully",
        status: 200,
        data: response.data,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Failed to fetch data",
      status: 500,
      data: null,
    });
  }
}

module.exports = {
  createTenant,
  getTenant,
};
