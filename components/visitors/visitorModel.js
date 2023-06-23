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
  status,
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

async function getVisit({ id, visitorName, skip, limit }) {
  try {
    let where = {};
    if (id) {
      where._id = id;
    }
    if (visitorName) {
      where.visitorName = visitorName;
    }
    console.log(where);
    let visitorData = await Visitor.find(where).skip(skip).limit(limit);
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
