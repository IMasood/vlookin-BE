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
    console.log("in userMOdels");
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
        return user
      }
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
