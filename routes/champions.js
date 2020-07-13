const express = require("express");
const axios = require("axios");
const fs = require("fs");
const router = express.Router();

// @desc    Get the champion name by champion id
// @route   /api/champion/:id
// @access  Public
router.get("/:id", (req, res) => {
  const championId = req.params.id;

  // Find the name of the correponding champion by id
  fs.readFile("./cached_data/data.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Internal server error");

    const jsonData = JSON.parse(data);

    Object.keys(jsonData.data).forEach((champ) => {
      if (jsonData.data[champ].key == championId) {
        res.status(200).json({
          name: jsonData.data[champ].name,
        });
      }
    });
  });
});

module.exports = router;
