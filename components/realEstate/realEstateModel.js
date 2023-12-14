const RealEstate = require("./realEstateSchema");
async function addRealEstate({
  buildingName,
  buildingCode,
}) {
  try {
    let newRealEstate = RealEstate.create({
      buildingName,
      buildingCode,
    });

    return newRealEstate;
  } catch (err) {
    throw err;
  }
}

async function getRealEstates({all, id}){
  try {
    let where = {};
    let response;
    if (all) {
      response = await RealEstate.find();
      return response;
    }
    if (id) {
      where._id = id;
    }
    response = await RealEstate.findOne(where)
    return response

  } catch (err) {
    throw err
  }

}
async function updateRealEstate({
  id,
  buildingName,
}) {
  try {
    let response = await RealEstate.findOneAndUpdate(
      { _id: id },
      {
        buildingName,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteRealEstate({id}){
  try {
    
    let response = await RealEstate.findOneAndDelete({_id: id})
    return response

  } catch (err) {
    throw err
  }

}

module.exports = {
  addRealEstate,
  getRealEstates,
  updateRealEstate,
  deleteRealEstate
};
