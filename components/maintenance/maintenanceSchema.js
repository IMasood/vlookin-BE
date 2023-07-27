const mongoose = require("mongoose");
const TenantModel = require("../tenant/model/tenantSchema");

const maintenance = new mongoose.Schema(
  {
    category: String,
    description: String,
    images: [{url: String , imageId: String}],
    complaintId: String,
    createdBy: String,
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "TenantModel" },
    status: {type: Boolean, default: false}
  },
  { timestamps: true }
);

// Create and export the model
const Maintenance =
  mongoose.models.maintenance || mongoose.model("Maintenance", maintenance);
module.exports = Maintenance;
