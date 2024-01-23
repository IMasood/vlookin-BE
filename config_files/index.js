require("dotenv").config(); //instatiate environment variables

let config = {}; //Make this global to use all over the application

// `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.yfjcchu.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`;
config.DB_USER = process.env.DB_USER || "aleeza";
config.DB_NAME = process.env.DB_NAME || "CRM";
config.DB_PASSWORD = process.env.DB_PASSWORD || "q2Tt77RFz7NHqiz";
config.MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.nbtxw.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`

//JWT CONFIG
config.JWT_SECRET = process.env.JWT_SECRET || "VLookingAppHerkou";
config.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "10d";
config.JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN || "10";

module.exports = config;
