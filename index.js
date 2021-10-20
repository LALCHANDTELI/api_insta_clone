const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });
require("./db/conn");

const user = require("./models/User")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(require("./routes/auth"));



app.listen(process.env.PORT, (error) => {
  if (error) throw error;
});
