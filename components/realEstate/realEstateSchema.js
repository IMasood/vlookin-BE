const mongoose = require("mongoose");
let buildingSchema = require('../buildings/buildingSchema');

// Define the schema
const realEstateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    building:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "BuildingModel",
    }
  },
  { timestamps: true }
);

// Create and export the model
const RealEstateModel =
  mongoose.models.realEstateSchema ||
  mongoose.model("RealEstateModel", realEstateSchema);
module.exports = RealEstateModel;
