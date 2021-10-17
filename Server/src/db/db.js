require("dotenv").config();
const mongoose = require("mongoose");

const DBname = process.env.DB_NAME;

module.exports = () => {
  //   return mongoose.connect(
  //     `${process.env.DB_URL_LOCAL}/${process.env.DB_NAME}`
  //     {

  //       useUnifiedTopology: true,
  //       useNewUrlParser: true,
  //       useCreateIndex: true,
  //     },

  //     (e, conn) => {
  //       if (e) console.log(e);
  //       console.log(`connected to ${DBname} DB`);
  //     }
  //   );
  mongoose.connect(
    `${process.env.DB_URL_LOCAL}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // useFindAndModify: false,
    },
    () => {
      console.log("Connected to DB");
    }
  );
};
