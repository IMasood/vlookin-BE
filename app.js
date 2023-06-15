const express = require("express");
const config = require("./config_files/db_config");
const app = express();

var authRouter = require("./components/auth/routes/auth");
var tenantRouter = require("./components/tenant/routes/tenant");

var cors = require("cors");

app.use(express.json());
app.use(cors());
// Define routes and middleware here
app.use("/tenant", tenantRouter);
app.use("/auth", authRouter);
config.connectDatabase();
const port = 4000; // Set the port number you want to use

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
