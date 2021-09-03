const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE).catch((error) => {
  console.log(error);
});
