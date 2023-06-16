const Visitor = require("./visitorSchema.js");

async function createVisit({
  visitorId,
  visitDate,
  buildingName,
  flatNo,
  maxRooms,
  comments,
  status,
}) {
  try {
    let newVisit = await Visitor.create({
      visitorId,
      visitDate,
      buildingName,
      flatNo,
      maxRooms,
      comments,
      status,
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

async function getVisit({ id, visitorId }) {
  try {
    let where={};
    if (id) {
      where._id = id;
    }
    if (visitorId) {
      where.visitorId = visitorId;
    }
    console.log(where);
    let visitorData = await Visitor.find(where);
    return visitorData;
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
}

module.exports = {
  createVisit,
  getVisit,
};
