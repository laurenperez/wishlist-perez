// Dependencies
const express = require("express");
const router = require("./controllers/home");
const app = express();
const middleware = require("./utils/middleware");
const PORT = process.env.PORT;

middleware(app);

app.listen(PORT, () =>
  console.log(`You are giftening to the smoothe sounds of port ${PORT}...`)
);
