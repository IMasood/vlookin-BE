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
      userId,
    } = req.body;

    let emailReg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    let contactRegex = /^(?:\+971|0)(?:\d{1,2})?\d{7}$/

    if (!emailReg.test(email) || !contactRegex.test(contact)) {
      return res.status(400).send({
        message: "Invalid email or contact format",
      });
    }
    let userExists = await userModel.getUsers({ email });

    console.log(userExists);

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
      userId,
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
    let { id, role, email, name } = req.query;
    let userData = await userModel.getUsers({ id, role, email, name });
    res.send({
      status: 200,
      message: "Data fetched successfully",
      data: userData,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function updateUser(req, res) {
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
      userId,
    } = req.body;

    let id = req.query;

    let response = await userModel.updateUser({
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
    });

    if (response !== null) {
      res.status(200).send({
        status: 200,
        message: "User Updated Successfully",
        data: response,
      });
    } else {
      res.status(200).send({ message: "No record found" });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    let id = req.query;
    let result = await userModel.deleteUser(id);
    res.status(200).send({
      status: 200,
      message: "User Successfully Deleted",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
