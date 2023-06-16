const mongoose = require("mongoose");

// Define the schema
const tenantSchema = new mongoose.Schema(
  {
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
  { timestamps: true }
);

// Create and export the model
const TenantModel =
  mongoose.models.tenantSchema || mongoose.model("TenantModel", tenantSchema);
module.exports = TenantModel;
