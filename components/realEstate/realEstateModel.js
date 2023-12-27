const RealEstate = require("./realEstateSchema");
const Building = require("../buildings/buildingSchema")

async function addRealEstate({
  name,
  code,
}) {
  try {
    let newRealEstate = RealEstate.create({
      name,
      code,
    });

    return newRealEstate;
  } catch (err) {
    throw err;
  }
}

async function getRealEstate({all, id}){
  try {
    let where = {}
    let response
    if(id){
      where._id = id;
    }

    if (all) {
            response = await RealEstate.aggregate([
        {
          $lookup: {
            from: "buildings", // Replace with the actual name of your buildings collection
            localField: "_id",
            foreignField: "realEstateId",
            as: "buildings"
          }
        },
        {
          $match: {
            buildings: { $size: 0 } // Filter real estates with empty "buildings" array
          }
        }
      ]);

      // response = await RealEstate.find(where);
      return response;
    }
    response = await RealEstate.findOne(where)
    let building = await Building.findOne({ realEstateId: id })
    let respObject = {
      ...response.toObject(), // Convert Mongoose document to a plain JavaScript object
      buildingId: building._id,
      buildingName: building.buildingName,
      buildingCode: building.buildingCode
    }
    return respObject
  } catch (err) {
    throw err
  }

}
async function updateRealEstate({
  id,
  name,
}) {
  try {
    let response = await RealEstate.findOneAndUpdate(
      { _id: id },
      {
        name,
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
  getRealEstate,
  updateRealEstate,
  deleteRealEstate
};
