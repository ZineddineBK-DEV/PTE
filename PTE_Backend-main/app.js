// ============imports=============
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
// import { createServer } from "http";
// import { Server } from "socket.io";

// ============ imporing routes ================
const usersRoute = require("./src/routes/user");
const loginRoute = require("./src/routes/login");
const cvRoute = require("./src/routes/cv");

const careerRoute = require("./src/routes/career");

/**Material Resources Routes */
const roomRoute = require("./src/routes/material_resources/room");
const vehicleRoute = require("./src/routes/material_resources/vehicle");
const virtualizationEnvRoute = require("./src/routes/material_resources/virtualization_env");

//========== configuration ============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control");
  // intercept OPTIONS method
  if ('OPTIONS' == req.method){
    res.status(200).send();
  }
  else {
    next();
  }
})


//=========== connecting to database ==============
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://pteCluster:pteCluster@pte.uecwzfo.mongodb.net/PTE-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("error has been occured: ", err));

// ========= configurring routes ==========
app.use("/images", express.static(path.join("./src/static/images")));
app.use("/pdf", express.static(path.join("./src/uploads/plans")));

app.use("/api/users", usersRoute);
app.use("/api/login", loginRoute);
app.use("/api/cv", cvRoute);
/**Material Resources */
app.use("/api/material/room", roomRoute);
app.use("/api/material/vehicle", vehicleRoute);
app.use("/api/material/virtualization", virtualizationEnvRoute);
app.use("/api/career", careerRoute);

// ======== exporting app ========
module.exports = app;
