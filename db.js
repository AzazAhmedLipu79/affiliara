const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ahmedlipu02:5xy3zpSffjwyLhqX@cluster0.x6la6nx.mongodb.net" +
      "/affiliara",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connection successfull.");
  })
  .catch((error) => {
    console.log("Database connection error: " + error);
  });
