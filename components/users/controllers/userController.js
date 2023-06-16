const userModel = require("../dal/userModel");
const auth = require("../../../middleware/authMiddleware");

async function createUser(req, res) {
  try {
    let {
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      gender,
      userId
    } = req.body;

    let userExists = await userModel.getUsers({ email });

    if (userExists) {
      return res.status(409).send({
        success: false,
        message: "User with an email already exist",
      });
    }

    let userCreated = await userModel.createUser({
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      gender,
      userId
    });

    res.status(200).send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      data: null,
      message: "Failed to create user",
    });
  }
}

async function getUsers(req, res) {
  try {
    let { userId, role, email, name } = req.query
    let userData = await userModel.getUsers({ userId, role, email, name });
    res.send({
      status: 200,
      message: "Data fetched successfully",
      data: userData,
    })
} catch (err) {
  res.send({
    status: 500,
    message: err.message,
  });
}  
}




module.exports = {
  createUser,
  getUsers
}