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
          comments

            
    } = req.body;

    let newApartment = await apartmentModel.addApartment({
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
    let result = await apartmentModel.getApartment({id, all});

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
