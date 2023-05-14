const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const usersRoute = require("./routes/users");
const jobsRoute = require("./routes/jobs");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// parse application / www url encoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application / json
app.use(bodyParser.json());

// write the function for connection and then only use the app for routes
async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to the Data Base");
  } catch (err) {
    throw err;
  }
}
// if database gets disconnected
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Data Base disconnecting...");
});
// if database gets connected again
mongoose.connection.on("connected", () => {
  console.log("MongoDB Data Base connecting...");
});

// use the app for routes here and then error middleware next()
app.use("/api/users", usersRoute);
app.use("/api/jobs", jobsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 409;
  const errorMessage = err.message || "Something went wrong, Please try again";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// define port from env file and an alternative port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  // run connecting db function and then start server
  connectDB();
  console.log(`App is now running on port: [${port}]`);
});
