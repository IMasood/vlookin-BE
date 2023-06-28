const buildingModel = require("./buildingModel");
const code_generator = require("../../services/code_generator");
async function createBuilding(req, res) {
  try {
    let {
      buildingName,
      floorCount,
      parkingCount,
      watchman,
      landmark,
      fullName,
    } = req.body;

    let buildingCode = code_generator.buildingCode(buildingName);
    let newBuilding = await buildingModel.addBuilding({
      buildingName,
      buildingCode,
      floorCount,
      parkingCount,
      watchman,
      landmark,
      fullName,
    });
    res.send({
        status: 200,
        message: "building successfully added",
        data: newBuilding
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function getBuilding(req, res){
 
try {
      
  let result = await buildingModel.getBuilding();

  res.status(200).send({
    status: 200,
    message: "Building Data Fetched Successfully",
      data: result,
  })

    } catch (err) {
        res.status(500).send({
            status:500,
            message: err.message,
        })
    }
}

module.exports = {
  createBuilding,
  getBuilding
};
