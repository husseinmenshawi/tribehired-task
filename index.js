require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());

const postRoutes = require("./routes/posts");

app.get("/", (req, res) => {
  res.send("Tribehired API v1.0 reporting for duty!");
});

app.use("/posts", postRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
