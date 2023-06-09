const mongoose = require("mongoose");
const userModel = require("../users/models/user/userSchema");

// Define the schema
const { Schema } = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorId: { type: mongoose.Schema.Types.ObjectId, ref: userModel },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: userModel },
    attendant: { type: mongoose.Schema.Types.ObjectId, ref: userModel },
    visitorName: { type: String, required: true },
    email: { type: String, required: true },
    contact: String,
    visitDate: { type: Schema.Types.Date },
    buildingName: { type: String },
    flatNo: { type: String },
    maxRooms: { type: Number },
    comments: { type: String },
    followUp: { type: String},
  },
  { timestamps: true }
);

// Create and export the model
const VisitorModel =
  mongoose.models.visitorSchema ||
  mongoose.model("VisitorModel", visitorSchema);
module.exports = VisitorModel;
