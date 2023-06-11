const express = require("express");
const config = require("./config_files/db_config")
const app = express();

var authRouter = require("./routes/auth")
var dataRouter = require("./routes/data")

var cors = require("cors")

app.use(express.json())
app.use(cors())
// Define routes and middleware here
app.use("/data", dataRouter)
app.use("/auth", authRouter)
config.connectDatabase()
const port = 4000; // Set the port number you want to use

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
