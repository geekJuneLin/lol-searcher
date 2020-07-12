const express = require("express");
const router = express.Router();
const axios = require("axios");

// @desc    Get the matches info of a specific summoner by its account id
// @route   /api/match/byAccount/:accountId
// @access  Public
router.route("/:accountId").get((req, res) => {
  const accountId = req.params.accountId;
  if (accountId) {
    axios
      .get(
        process.env.API_MATCH_URL +
          accountId +
          "?api_key=" +
          process.env.API_KEY
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => {
        console.log(`Fetching matches info with ${err}`);
        return res.status(500).send("Internal server error");
      });
  } else {
    return res.status(400).send("Bad request, please include the account id");
  }
});

module.exports = router;
