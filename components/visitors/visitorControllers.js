var visitorModel = require("./visitorModel");
const moment = require("moment");

async function createVisit(req, res) {
  try {
    let {
      visitorName,
      email,
      contact,
      date,
      buildingName,
      flatNo,
      maxRooms,
      comments,
      followUp,
    } = req.body;

    let visitDate = moment(date);
    let newVisit = await visitorModel.createVisit({
      visitorName,
      email,
      contact,
      visitDate,
      buildingName,
      flatNo,
      maxRooms,
      comments,
      followUp,
    });
    res.send({
      status: 200,
      message: "Visit Created Successfully",
      data: newVisit,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function getVisit(req, res) {
  try {
    let { id, visitorName, page = 1, limit = 10, buildingId } = req.query;

    // Calculate skip and limit values based on the page number and limit
    const skip = (page - 1) * limit;

    let fetchVisits = await visitorModel.getVisit({
      id,
      visitorName,
      limit,
      skip,
      buildingId
    });
    console.log(fetchVisits);
    res.send({
      status: 200,
      message: "data fetched successfully",
      data: fetchVisits,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function updateVisit(req, res) {
  try {
    let id = req.query;
    let {
      visitorName,
      email,
      contact,
      date,
      buildingName,
      flatNo,
      maxRooms,
      comments,
      followUp,
    } = req.body;

    let visitDate =moment(date)

    let result = await visitorModel.updateVisit({
      id,
      visitorName,
      email,
      contact,
      visitDate,
      buildingName,
      flatNo,
      maxRooms,
      comments,
      followUp,
    });
    if (result === null) {
      res.status(404).send({
        message: "Record does not exists",
        status: 404,
        response: result,
      });
    } else {
      res.status(200).send({
        message: "Update Successful",
        status: 200,
        response: result,
      });
    }
    return result
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}



async function deleteVisit(req, res) {
  try {
    let { id } = req.query;


    let result = await visitorModel.deleteVisit({ id });

    if (result === null) {
      res.status(404).send({
      message: "Record does not exists",
      status: 404,
      response: result,
    });     
    }else{
    res.status(200).send({
      message: "Deleted Successfully",
      status: 200,
      response: result,
    });}
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}
module.exports = {
  createVisit,
  getVisit,
  updateVisit,
  deleteVisit,
};
