const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    gender: {
      type: String,
    },
    allowSubUsers: {
      type: Boolean,
    },
    allowMultipleBuildings: {
      type: Boolean,
    },
    status: {
      type: Boolean,
    },
    userId: {
      type: String,
      unique: true
    },
  },
  { timeStamps: true }
);

//If password changes hash it before updating the document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the model
const UserModel =
  mongoose.models.userSchema || mongoose.model("UserModel", userSchema);
module.exports = UserModel;
