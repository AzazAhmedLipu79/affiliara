const express = require("express");
const fs = require("fs");
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

app.post("/newsletter", (req, res) => {
  if (!req.body.email || !req.body.name) {
    return res.status(400).send({ message: "no data given" });
  }

  console.log(req.body);
  const data = `${req.body.name}, ${req.body.email}\n`;
  const dataJsonFormat = {
    name: req.body.name,
    email: req.body.email,
  };
  const dataJson = JSON.stringify(dataJsonFormat);

  const onlyEmailData = `${req.body.email},`;
  try {
    fs.appendFileSync("user.txt", data, "utf-8");
  } catch (error) {
    res.send("File Doesn't Exist");
  }

  try {
    fs.appendFileSync("user.json", dataJson, "utf-8");
  } catch (error) {
    res.send("File Doesn't Exist");
  }
  try {
    fs.appendFileSync("email.txt", onlyEmailData, "utf-8");
  } catch (error) {
    res.send("File Doesn't Exist");
  }

  res.send({ success: true, name: req.body.name, email: req.body.email });
});

app.get("/cleardata", (req, res) => {
  try {
    fs.writeFileSync("user.txt", "", "utf-8");
  } catch (error) {
    res.send("File Doesn't Exist");
  }

  try {
    fs.writeFileSync("user.json", "", "utf-8");
  } catch (error) {
    res.send("File Doesn't Exist");
  }
  try {
    fs.writeFileSync("email.txt", "", "utf-8");
  } catch (error) {
    res.send("File Doesn't Exist");
  }

  res.send({ message: "Successfully Data Cleared" });
});

app.listen(port, () => {
  console.log("Server is Running at ", port);
});

// Export the Express API
module.exports = app;
