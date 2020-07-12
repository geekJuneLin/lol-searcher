const express = require("express");
const axios = require("axios");
const fs = require("fs");
const router = express.Router();

// @desc    Get the new champs rotation information
// @route   GET /api/champ_rotation
// @access  Public
router.route("/").get((req, res) => {
  const url = process.env.API_ROTATION_URL + "?api_key=" + process.env.API_KEY;

  axios
    .get(url)
    .then((result) => {
      const fetchedData = result.data.freeChampionIds;
      const needToReturnData = [];

      fs.readFile("./cached_data/data.json", "utf8", (err, data) => {
        if (err) return console.log("reading cached data with error" + err);

        const cachedData = JSON.parse(data);

        // Filter the free champ from the champ pool
        for (let i = 0; i < fetchedData.length; i++) {
          Object.keys(cachedData.data).forEach((champ) => {
            if (cachedData.data[champ].key == fetchedData[i])
              needToReturnData.push({
                name: cachedData.data[champ].name,
              });
          });
        }

        // Send data back to the user
        res.json(needToReturnData);
      });
    })
    .catch((error) => {
      if (error) return console.log(`Error: ${error}`);
    });
});

module.exports = router;
