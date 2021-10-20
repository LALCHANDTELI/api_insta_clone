const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });
require("./db/conn");

const user = require("./models/User")
const sgMail = require('@sendgrid/mail')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(require("./routes/auth"));




const meddleware = (req, res, next) => {
  console.log("meddleware called");
  next();
};

app.get("/", meddleware, (req, res) => {
   sgMail.setApiKey("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")
  const msg = {
    to: 'lalchandteli13@gmail.com', 
    from: 'lalchandteli13@gmail.com', 
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail.send(msg)
    .then(() => {
       res.send("sent");
    })
    .catch((error) => {
       res.send("error");
    })
  
  
   console.log("health okay okay");
 
  
  
   
  
 
});

app.listen(process.env.PORT, (error) => {
  if (error) throw error;
});
