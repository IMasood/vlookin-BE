var Data = require ("../dal/data")

async function createTenant(req, res) {
  0
  let { tenantName, email, buildingName, flatNo, contact, officeNo, nationality } =
        req.body;
  try {
    console.log("In POST COntroller")

    let response = await Data.create({
      tenantName,
      email,
      buildingName,
      flatNo,
      contact,
      officeNo,
      nationality,
    });  
    if( response.status == 200){
    res.status(200).send({
      message: "Tenant created successfully",
      status: 200,
      data: null
    })
    }     
    } catch (err) {
          res.status(200).send({
            message: ("Failed to add Tenant", err.message),
            status: 500,
          });  
    }
}

async function getData(req, res) {
  try {
    let response = await Data.getData()
    console.log(response)
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
  getData,
};
