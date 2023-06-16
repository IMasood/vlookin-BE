const userModel = require("../users/dal/userModel");
const auth = require("../../middleware/authMiddleware");


async function login(req, res) {
  try {
    let { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Email & Password",
      });
    }

    let user = await userModel.getUsers({ email });
    
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const userData = {
      id: user._id,
      userName: user.userName,
      status: user.status,
      email: user.email,
      contact: user.contact,
      role: user.role,
      allowSubUsers: user.allowSubUsers,
      allowMultipleBuildings: user.allowMultipleBuildings,
    };

    auth.createAndSendToken(userData, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      data: null,
      message: "Failed to login",
    });
  }
}

module.exports = {
  login,
};
