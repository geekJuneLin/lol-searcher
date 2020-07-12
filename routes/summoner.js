const express = require("express");
const router = express.Router();
const axios = require("axios");

// @desc    Get the information of a specified summoner
// @route   /api/summoner/:name
// @access  Public
router.route("/:name").get((req, res) => {
  const name = req.params.name;
  if (name) {
    axios
      .get(
        process.env.API_SUMMONER_URL + name + "?api_key=" + process.env.API_KEY
      )
      .then((response) => {
        const { name, accountId, summonerLevel } = response.data;
        return res.status(200).json({
          level: summonerLevel,
          name: name,
          id: accountId,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Internal server error!");
      });
  } else
    res.status(400).json({
      msg: "Please include summoner's name",
    });
});

module.exports = router;
