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

async function getUsers({ id, email, role, name }) {
  try {
    let user = null;
    let searchParams = {};
    if (id) {
      searchParams._id = id;
    }
    if (email) {
      searchParams.email = email;
    }
    if (role) {
      searchParams.role = role;
    }
    if (name) {
      searchParams.userName = name;
    }
    user = await User.find(searchParams);
    console.log(searchParams, user);
      if(user.length ==1){
        return user[0];
      } else {
        return user;
      }
  } catch (err) {
    console.log(err.status);
    return {
      status: 500,
      message: err.message,
    };
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
  deleteUser
};
