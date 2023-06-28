const Building = require("./buildingSchema");

async function addBuilding({
  buildingName,
  buildingCode,
  floorCount,
  parkingCount,
  watchman,
  landmark,
  fullName,
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
    });

    return newBuilding;
  } catch (err) {
    throw err;
  }
}

async function getBuilding(){
  try {
    
    let response = await Building.find()
    return response

  } catch (err) {
    throw err
  }

}

module.exports = {
  addBuilding,
  getBuilding
};
