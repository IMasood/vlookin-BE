const Apartment = require("./apartmentSchema");

async function addApartment({
  buildingId,
  apartmentType,
  area,
  rent,
  furnished,
  isStudio,
  balcony,
  rooms,
  comments,
}) {
  try {
    let newApartment = Apartment.create({
      buildingId,
      apartmentType,
      area,
      rent,
      furnished,
      isStudio,
      balcony,
      rooms,
      comments,
    });

    return newApartment;
  } catch (err) {
    throw err;
  }
}

async function getApartment({all, id}) {
  try {
    let where = {}
    let response
    if (all) {
      response = await Apartment.find().populate("buildingId");
      return response
    }
    if(id){
      where._id = id
    }
    response = await Apartment.findOne(where).populate("buildingId");
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
