const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const app = express();

app.use(bodyParser.json(), cors());
app.options("*", cors());
app.post("/get-access-token", async (req, res) => {
  console.log("req from front end is", req);
  let code = req.body.code;
  let str = `BH3UMXbWSyK4fqdT7sOoJQ:sWV7zr2Tv79XHhbiW618uiJtxqTyVGPn`;

  let buff = new Buffer(str);
  let base64data = buff.toString("base64");
  axios;
  let tokenHeader = {
    Authorization: `Basic ${base64data}`
  };
  try {
    await axios
      .post(
        `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:5010/meeting`,
        {},
        { headers: tokenHeader }
      )
      .then(response => {
        res.status(200).json({ message: "success", data: response.data });
      })
      .catch(err => {
        console.log("zoom error", err);
      });
  } catch (err) {
    console.log("exceptional error", err);
  }
});

const port = process.env.PORT || 4000;

app.listen(port);
console.log("server started on", port);
