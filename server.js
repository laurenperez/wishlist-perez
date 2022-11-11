// Dependencies
const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const PORT = process.env.PORT;

// Passing app into this function allows us to use it in middleware.js
middleware(app);

// Giftener
app.listen(PORT, () =>
  console.log(`You are giftening to the smoothe sounds of port ${PORT}...`)
);
