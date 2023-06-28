var tenantModel = require("../dal/tenantModel");

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

    let response = await tenantModel.create({
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
    let {id , email} = req.query
    let response = await tenantModel.getTenant({id, email});
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

async function updateTenant(req, res) {
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

    let id = req.query;

    let response = await tenantModel.updateTenant({
      id,
      tenantName,
      email,
      buildingName,
      flatNo,
      contact,
      officeNo,
      nationality,
    });

    res.status(200).send({
      status: 200,
      message: "Tenant Updated Successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}


async function deleteTenant(req, res) {
  try {
    let id = req.query
    let result = await tenantModel.deleteTenant(id) 
    res.status(200).send({
      status: 200,
      message: "Tenant Successfully Deleted",
      data: result,
    })
    

  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message
    })
  }
} 

module.exports = {
  createTenant,
  getTenant,
  updateTenant,
  deleteTenant
};
