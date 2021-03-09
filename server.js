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
        `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=https://friendly-aryabhata-6fafd4.netlify.app/meeting`,
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

app.post("/create-webinar", (req, res) => {
  // console.log("data from frint end", req.body);
  var today = new Date();
  today.setHours(today.getHours() + 4);
  let access_token = req.body.access_token;
  let userId = req.body.userId;
  let webinarData = {
    topic: "Test Webinar",
    type: 5,
    start_time: new Date(),
    duration: "60",
    timezone: "America/Los_Angeles",
    password: "avfhfgh",
    agenda: "Test Webinar",
    recurrence: {
      type: 1,
      repeat_interval: 1,
      end_date_time: today
    },
    settings: {
      host_video: "true",
      panelists_video: "true",
      practice_session: "true",
      hd_video: "true",
      approval_type: 0,
      registration_type: 2,
      audio: "both",
      auto_recording: "none",
      enforce_login: "false",
      close_registration: "true",
      show_share_button: "true",
      allow_multiple_devices: "false",
      registrants_email_notification: "true"
    }
  };
  let tokenHeader = {
    Authorization: `Bearer ${access_token}`
  };
  try {
    axios
      .post(`https://api.zoom.us/v2/users/${userId}/webinars`, webinarData, {
        headers: tokenHeader
      })
      .then(response => {
        // console.log("response from webinar zoom", response.data);
        res.status(200).json({
          message: "sucess",
          data: response.data
        });
      })
      .catch(err => {
        console.log("error from zoom webinar", err);
      });
  } catch (err) {
    console.log("err", err);
  }
});
const port = process.env.PORT || 4000;

app.listen(port);
console.log("server started on", port);
