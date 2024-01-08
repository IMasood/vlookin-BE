const Visitor = require("./visitorSchema.js");

async function createVisit({
  visitorName,
  email,
  contact,
  visitDate,
  buildingName,
  flatNo,
  maxRooms,
  comments,
  followUp,
}) {
  try {
    let newVisit = await Visitor.create({
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

    return newVisit;
  } catch (err) {
    console.log(err.message);
    return {
      status: 500,
      message: err.message,
    };
  }
}

async function getVisit({ id, visitorName, skip, limit, buildingId }) {
  try {
    let where = {};
    if (id) {
      where._id = id;
    }
    if (visitorName) {
      where.visitorName = visitorName;
    }
    if (buildingId) {
      where.buildingName = buildingId;
    }
    console.log(where);
    let visitorData = await Visitor.find(where);
    return visitorData ;
  } catch (err) {
    throw(err)
  }

}

async function updateVisit({
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
}) {
  try {
    let response = await Visitor.findOneAndUpdate(
      { _id: id.id },
      {
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
    return response;
  } catch (err) {
    throw err;
  }
}

async function deleteVisit({ id }) {
  try {
    let response = await Visitor.findOneAndDelete({ _id: id });
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createVisit,
  getVisit,
  updateVisit,
  deleteVisit,
};
