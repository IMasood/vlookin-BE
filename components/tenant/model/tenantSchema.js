const mongoose = require("mongoose");
// const BuildingModel = require("../../buildings/buildingSchema")

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
    buildingId: {
      type: mongoose.Types.ObjectId,
      ref: "BuildingModel",
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
    OTP: {
      type: String,
    },
    OTP_Expiry: {
      type: mongoose.SchemaTypes.Date,
    },
    OTP_Verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compare Email OTP
tenantSchema.methods.compareEmailVerificationOTP = async function (OTP) {
  return await bcrypt.compare(OTP, this.OTP);
};

// Create and export the model
const TenantModel =
  mongoose.models.tenantSchema || mongoose.model("TenantModel", tenantSchema);
module.exports = TenantModel;
