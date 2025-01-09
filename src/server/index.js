const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { analyze } = require("./analyze.js");

// configure env file
dotenv.config();

port = 8000;
const KEY = process.env.API_KEY;

app.use(cors());

// read JSON
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  const Analyze = await analyze(url, KEY);
  const { code, msg, sample } = Analyze;

  if (code == 100 || code == 212) {
    return res.send({ msg: msg, code: code });
  }
  return res.send({ sample: sample, code: code });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
