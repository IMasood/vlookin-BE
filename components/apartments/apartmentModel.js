const Apartment = require("./apartmentSchema");

async function addApartment(apartments) {
  try {
    let newApartment;

   newApartment = await Apartment.insertMany(apartments);

    return newApartment;
  } catch (err) {
    throw err;
  }
}

async function getApartment({all, id, buildingId}) {
  try {
    let where = {}
    let response
    if(id){
      where._id = id
    }
    if(buildingId){
      where.buildingId = buildingId
    }
    
    if (all) {
      response = await Apartment.find(where).populate("buildingId", ["buildingName","buildingCode"]);
      return response
    }
    response = await Apartment.findOne(where).populate("buildingId", [
      "buildingName",
      "buildingCode",
    ]);
    return response;
  } catch (err) {
    throw err;
  }
}
async function updateApartment({
  id,
  buildingId,
  apartmentType,
  area,
  rent,
  furnished,
  isStudio,
  balcony,
  rooms,
  floorNo,
  flatNo,
  comments,
}) {
  try {
    let response = await Apartment.findOneAndUpdate(
      { _id: id },
      {
        buildingId,
        apartmentType,
        area,
        rent,
        furnished,
        isStudio,
        balcony,
        rooms,
        floorNo,
        flatNo,
        comments,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteApartment({ id }) {
  try {
    let response = await Apartment.findOneAndDelete({ _id: id });
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = {
    addApartment,
    getApartment,
    updateApartment,
    deleteApartment
};
