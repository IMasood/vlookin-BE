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
      facilities,
     realEstateId
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
      facilities,
     realEstateId
    });
    res.status(200).send({
      status: 200,
      message: "building successfully added",
      data: newBuilding,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function getBuilding(req, res) {
  try {
    let { all, id, realEstateId } = req.query;
    let result = await buildingModel.getBuilding({ all, id, realEstateId });

    res.status(200).send({
      status: 200,
      message: "Building Data Fetched Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}


async function updateBuilding(req, res) {
  try {
    let { id } = req.query;
    let {
      buildingName,
      fullName,
      watchman,
      floorCount,
      parkingCount,
      landmark,
      facilities,
    } = req.body;

    let updatedBuilding = await buildingModel.updateBuilding({
      id,
      buildingName,
      fullName,
      watchman,
      floorCount,
      parkingCount,
      landmark,
      facilities,
    });
    return res.status(200).send({
      message: "Building Updated Succesfully",
      status: 200,
      data: updatedBuilding,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

async function deleteBuilding(req, res) {
  try {
    let { id } = req.query;

    let deleteBuilding = await buildingModel.deleteBuilding({ id });
    return res.status(200).send({
      message: "Building Deleted Succesfully",
      status: 200,
      data: deleteBuilding,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

async function getBuildingRelatedDetails(req, res){
  try{
    let {buildingId} = req.query;

  }catch(err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

module.exports = {
  createBuilding,
  getBuilding,
  updateBuilding,
  deleteBuilding,
};
