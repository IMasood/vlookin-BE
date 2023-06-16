var visitorModel = require("./visitorModel");

async function createVisit(req, res) {
  try {
    let {
      visitorId,
      visitDate,
      buildingName,
      flatNo,
      maxRooms,
      comments,
      status,
    } = req.body;

    let newVisit = await visitorModel.createVisit({
      visitorId,
      visitDate,
      buildingName,
      flatNo,
      maxRooms,
      comments,
      status,
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

async function getVisit(req,res) {
  try {
    // res.send("workingg")
    let { id } = req.query;
    let fetchVisits = await visitorModel.getVisit({ id });
    console.log(fetchVisits)
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

module.exports = {
  createVisit,
  getVisit,
};
