/*
Mini MERN BACKEND API VERSION 1

This is where everything get connected together!

NMP Packages needed are as follows:

Express for server handling
CORS for cross Origin Resource Service Access

*/

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3500;
const app = express();

//DB connection
const connectDB = require("./db/connect");
//import auth router
const authRouter = require("./routes/auth");

//init the cors packages
app.use(cors());
//init express to use JSON
app.use(express.json());

//routes init
//api/v1/auth is used here by choice and for API version management only, otherwise it is not requires
app.use("/api/v1/auth", authRouter);

const initServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};
//call the server to start
initServer();
