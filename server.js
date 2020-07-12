const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const app = express();

dotenv.config({ path: "./config/config.env" });

// Set middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const champRotationRoute = require("./routes/champRotation");
const summoner = require("./routes/summoner");
const matches = require("./routes/matches");

app.use("/api/champ_rotation", champRotationRoute);
app.use("/api/summoner", summoner);
app.use("/api/match/byAccount", matches);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
  fetchDragonData();
});

// Try to load the static data from local first,
// if it doesn't exist, then send request to fetch the data
fetchDragonData = () => {
  try {
    if (!fs.existsSync("./cached_data/data.json")) {
      // Request the champ data
      axios
        .get(process.env.DRAGON_DATA_URL)
        .then((res) => {
          console.log(res.data);

          // Cache the fetched data
          fs.writeFile(
            "./cached_data/data.json",
            JSON.stringify(res.data),
            (err) => {
              console.log("writing file with error");
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log("FS error");
  }
};
