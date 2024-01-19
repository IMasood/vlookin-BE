const express = require("express");
const config = require("./config_files/db_config");
const morgan = require("morgan");
const app = express();

let authRouter = require("./components/auth/routes");
let tenantRouter = require("./components/tenant/routes");
let visitorRouter = require("./components/visitors/routes");
let userRouter = require("./components/users/routes");
let buildingRouter = require("./components/buildings/routes.js");
let apartmentRouter = require("./components/apartments/routes.js");
let receiptRouter = require("./components/receipts/routes.js");
let maintenanceRouter = require("./components/maintenance/routes.js");
let realEstateRouter = require("./components/realEstate/routes.js");
let notificationRouter = require('./components/notifications/routes')
let cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// Define routes and middleware here
app.use("/tenant", tenantRouter);
app.use("/auth", authRouter);
app.use("/visitor", visitorRouter);
app.use("/user", userRouter);
app.use("/building", buildingRouter);
app.use("/apartment", apartmentRouter);
app.use("/receipt", receiptRouter);
app.use("/maintenance", maintenanceRouter);
app.use("/realEstate", realEstateRouter)
app.use("/notify", notificationRouter)

config.connectDatabase();
const port = 4000; // Set the port number you want to use

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
