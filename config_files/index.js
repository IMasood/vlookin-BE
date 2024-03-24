require("dotenv").config(); //instatiate environment variables

let config = {}; //Make this global to use all over the application
config.DB_USER = process.env.DB_USER || "vlookin_dev";
config.DB_NAME = process.env.DB_NAME || "Vlookin";
config.DB_PASSWORD = process.env.DB_PASSWORD || "TcMvTF6gqWWbvbwp";
config.MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://vlookin_dev:TcMvTF6gqWWbvbwp@cluster0.dr7t8q8.mongodb.net/Vlookin?retryWrites=true&w=majority'
  // `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.yfjcchu.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`

//JWT CONFIG
config.JWT_SECRET = process.env.JWT_SECRET || "VLookingAppHerkou";
config.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "10d";
config.JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN || "10";

module.exports = config;
