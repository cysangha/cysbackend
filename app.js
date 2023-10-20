const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

require("./config/db");
// require("./config/dbupdated");
const app = express();
app.use(cors()); // Use this after the variable declaration
const port = process.env.PORT;
const host = process.env.HOST;
app.use("/users", require("./routes/users"));
app.use("/public", express.static("public"));

app.listen(port, () => {
  console.log(`App is listening at http://${host}:${port}`);
});
