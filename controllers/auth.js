const userModel = require("../dal/user");
const auth = require("../middleware/authMiddleware");

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
    } = req.body;

    let userExists = await userModel.getUsers({ email });
    console.log("hi",userExists);

    if (userExists) {
      return res.status(409).send({
        success: false,
        message: "User with an email already exist",
      });
    }
    // // const phoneRegex = /^\+[1-9]\d{1,14}$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   

    // if (!emailRegex.test({ email })) {
    //   console.log(emailRegex.test({email}))
    //   res.status(422).send("Invalid Email or Contact");
    //   return ("Credential did not passed Regex")
    // }

    let userCreated = await userModel.createUser({
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      gender,
    });

    res.status(200).send({
      success: true,
      message: "User created successfully",
      data: { userId: userCreated[0]?._id },
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
    let checkPassword = await user.comparePassword(password);

    if (!user || !checkPassword) {
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
  createUser,
  login,
};
