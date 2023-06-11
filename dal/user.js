let User = require("../models/user/userSchema");

async function createUser({
  userName,
  email,
  contact,
  password,
  role,
  allowSubUsers,
  allowMultipleBuildings,
  gender,
}) {
  try {
    let create = await User.create({
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      gender,
    });
    console.log(create);
    return {
      status: 200,
      message: "User created Successfully",
    };
  } catch (err) {
    console.log("User creation failed", err.message);
    return { message: err.message };
  }
}

async function getUsers({ id, email }) {
  try {
    let user = null;
    if (id) {
      user = await User.findOne({ id });
    }
    if (email) {
      user = await User.findOne({ email });
      console.log(user);
    } else {
      user = await User.find();
    }
    return user;
  } catch (err) {
    console.log(err.status);
    return {
      status: 500,
      message: err.message,
    };
  }
}

module.exports = {
  createUser,
  getUsers,
};
