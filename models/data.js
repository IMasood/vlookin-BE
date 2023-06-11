const mongoose = require("mongoose");


// Define the schema
const dataSchema = new mongoose.Schema({
  tenantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  buildingName: {
    type: String,
  },
  flatNo: {
    type: String,
  },
  contact: {
    type: String,
  },
  officeNo: {
    type: String,
  },
  nationality: {
    type: String,
  },
},
{timeStamps: true}
);


// Create and export the model
const DataModel = mongoose.models.dataSchema || mongoose.model("DataModel", dataSchema);
module.exports = DataModel;
