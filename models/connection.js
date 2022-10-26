// Dependencies
require("dotenv").config();
const mongoose = require("mongoose");

// Connection variables
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG_OPTIONS);

// Log when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));


// Export the connection for use in schemas
module.exports = mongoose;
