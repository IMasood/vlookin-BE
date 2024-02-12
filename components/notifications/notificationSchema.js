const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// Define the schema
const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BuildingModel",
      exists: true,
      required: true,
    },
    notifyee: {      //notifyee will be either tenant or admin
      type:String,
      required:true
    },
    isTriggered: {
      type:Boolean,
      default:false
    },
    actionBy: {
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

// Compare Email OTP


const NotificationModel =
  mongoose.models.tenantSchema || mongoose.model("NotificationModel", notificationSchema);
module.exports = NotificationModel;
