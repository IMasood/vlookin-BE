const Building = require("./buildingSchema");
const RealEstate = require("../realEstate/realEstateSchema");

async function addBuilding({
  buildingName,
  buildingCode,
  floorCount,
  parkingCount,
  watchman,
  landmark,
  fullName,
  facilities,
  realEstateId
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
      realEstateId
    });
    
    const updateRealEstateStatus = await RealEstate.findOneAndUpdate({ _id: realEstateId }, { available: false, reserved: true });
    if (updateRealEstateStatus) {
      console.log('Apartment updated successfully!');
    } else {
      console.log('Apartment update failed.');
    }
    return newBuilding;
  } catch (err) {
    throw err;
  }
}

async function getBuilding({all, id, realEstateId}){
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
    if(realEstateId){
      where.realEstateId = realEstateId
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
