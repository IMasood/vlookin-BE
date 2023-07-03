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
  userId,
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
      userId,
    });
    console.log(create);
    return create;
  } catch (err) {
    console.log("User creation failed", err.message);
    return "err:", { message: err.message };
  }
}

async function getUsers({ id, email, all, name }) {
  try {
    let user = null;
    let searchParams = {};
    if (all) {
      user = await User.find();
      return user;
    }
    if (id) {
      searchParams._id = id;
    }
    if (email) {
      searchParams.email = email;
    }
    user = await User.findOne(searchParams);
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateUser({
  id,
  userName,
  email,
  contact,
  password,
  role,
  allowSubUsers,
  allowMultipleBuildings,
  gender,
  userId,
}) {
  try {
    let response = await User.findOneAndUpdate(
      { _id: id.id },
      {
        userName,
        email,
        contact,
        password,
        role,
        allowSubUsers,
        allowMultipleBuildings,
        gender,
        userId,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}

async function deleteUser({ id }) {
  try {
    let response = await User.findOneAndDelete({ _id: id });
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
