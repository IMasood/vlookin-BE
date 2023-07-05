const Building = require("./buildingSchema");

async function addBuilding({
  buildingName,
  buildingCode,
  floorCount,
  parkingCount,
  watchman,
  landmark,
  fullName,
  facilities
}) {
  try {
    let newBuilding = Building.create({
      buildingName,
      buildingCode,
      floorCount,
      parkingCount,
      watchman,
      landmark,
      fullName,
      facilities,
    });

    return newBuilding;
  } catch (err) {
    throw err;
  }
}

async function getBuilding({all, id}){
  try {
    let where = {};
    let response;
    if (all) {
      response = await Building.find();
      return response;
    }
    if (id) {
      where._id = id;
    }
    response = await Building.findOne(where)
    return response

  } catch (err) {
    throw err
  }

}
async function updateBuilding({
  id,
  buildingName,
  fullName,
  watchman,
  floorCount,
  parkingCount,
  landmark,
  facilities,
}) {
  try {
    let response = await Building.findOneAndUpdate(
      { _id: id },
      {
        buildingName,
        fullName,
        watchman,
        floorCount,
        parkingCount,
        landmark,
        facilities,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteBuilding({id}){
  try {
    
    let response = await Building.findOneAndDelete({_id: id})
    return response

  } catch (err) {
    throw err
  }

}

module.exports = {
  addBuilding,
  getBuilding,
  updateBuilding,
  deleteBuilding
};
