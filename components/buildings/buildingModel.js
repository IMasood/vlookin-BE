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
    const realEstate = await RealEstate.findOne({ _id: realEstateId });
    if (!realEstate) {
      return res.status(404).json({ message: 'Real Estate not found' });
    }
    let newBuilding = Building.create({
      buildingName,
      buildingCode,
      floorCount,
      parkingCount,
      watchman,
      landmark,
      fullName,
      facilities,
      realEstateId: realEstate._id
    });
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
