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

async function getApartment() {
  try {
    let response = await Apartment.find();
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
