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
      data: newBuilding,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function getBuilding(req, res) {
  try {
    let { all, id } = req.query;
    let result = await buildingModel.getBuilding({ all, id });

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
    } = req.body;

    let updatedBuilding = await buildingModel.updateBuilding({
      id,
      buildingName,
      fullName,
      watchman,
      floorCount,
      parkingCount,
      landmark,
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

module.exports = {
  createBuilding,
  getBuilding,
  updateBuilding,
  deleteBuilding,
};
