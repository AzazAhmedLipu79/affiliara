const express = require("express");
require("./db");
const UserModel = require("./Model/user");
const port = 3721;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", express.static("user.txt"));
app.use("/user/json", express.static("user.json"));
app.use("/email", express.static("email.txt"));

app.get("/", (req, res) => {
  res.send({ message: "Hello AFFILIARA" });
});

app.get("/newsletter", (req, res) => {
  res.send({ users: "All users" });
});

app.post("/newsletter", async (req, res) => {
  let body = req.body;
  try {
    if (body != undefined) {
      const { name, email } = body;

      let data = {
        name,
        email,
      };
      let User = new UserModel(data);
      let CreateUser = await User.save();
      //   sendPushToAllSubscribedUsers();
      res.status(201).send({ status: "SUCCESS", data: CreateUser });
    } else {
      res.status(404).send({ status: "BODY_DATA_NOT_FOUND" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "FAILED", message: "Something went wrong" });
  }
});

app.get("/alluser", async (req, res) => {
  try {
    let query = req.query;
    let results = [];
    if (query.id != undefined) {
      results = await UserModel.findOne({ _id: query.id }).sort({});
    } else {
      results = await UserModel.find().sort({});
    }
    res.send(results);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(port, () => {
  console.log("Server is Running at ", port);
});

// Export the Express API
module.exports = app;
