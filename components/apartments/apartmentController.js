const apartmentModel = require("./apartmentModel");

async function addApartment(req, res) {
  try {
    let {
      buildingId,
      apartmentType,
      area,
      rent,
      furnished,
      isStudio,
      balcony,
      rooms,
      floorNo,
      comments,
      flatNo,
      noOfApartments,
    } = req.body;

    //to verify if apartment is already added to record
    let checkFlatExistence = await apartmentModel.getApartment({
      buildingId,
      all: true,
    });
    let arrayOfExistingFlats = [];
    arrayOfExistingFlats = checkFlatExistence.map((elem) => {
      return elem.flatNo;
    });

    let apartmentArray = [];
    for (let i = 0; i < noOfApartments; i++) {
      if (arrayOfExistingFlats.includes(flatNo[i])) {
        throw Error(
          `Apartment number ${flatNo[i]} already exists in this building.`
        );
      }

      apartmentArray.push({
        buildingId: buildingId,
        apartmentType: apartmentType,
        area: area,
        rent: rent,
        furnished: furnished,
        isStudio: isStudio,
        balcony: balcony,
        rooms: rooms,
        floorNo: floorNo,
        comments: comments,
        flatNo: flatNo[i],
      });
    }
    let newApartment = await apartmentModel.addApartment(apartmentArray);
    res.send({
      status: 200,
      message: "Apartment Successfully Added",
      data: newApartment,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function getApartment(req, res) {
  try {
    let { id, all } = req.query;
    let result = await apartmentModel.getApartment({ id, all });

    res.status(200).send({
      status: 200,
      message: "Apartment Data Fetched Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}
async function updateApartment(req, res) {
  try {
    let { id } = req.query;
    let {
      buildingId,
      apartmentType,
      area,
      rent,
      furnished,
      isStudio,
      balcony,
      rooms,
      floorNo,
      comments,
    } = req.body;

    let updatedApartment = await apartmentModel.updateApartment({
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
      comments,
    });
    return res.status(200).send({
      message: "Apartment Updated Succesfully",
      status: 200,
      data: updatedApartment,
    });
  } catch (err) {
    res.status(500).send({
      message: "Update failed",
      error: err.message,
      status: 500,
    });
  }
}
async function deleteApartment(req, res) {
  try {
    let { id } = req.query;

    let deletedApartment = await apartmentModel.deleteApartment({ id });
    return res.status(200).send({
      message: "Apartment Deleted Succesfully",
      status: 200,
      data: deletedApartment,
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
  addApartment,
  getApartment,
  updateApartment,
  deleteApartment,
};
