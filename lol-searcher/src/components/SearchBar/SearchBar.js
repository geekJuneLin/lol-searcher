import React, { useCallback, useState } from "react";

import "./SearchBar.example.css";
import { TextField, Container, Button, Box } from "@material-ui/core";

import { searchSummoner } from "../../API/API.js";

const SearchBar = () => {
  const [summonerName, setSummonerName] = useState("");

  const handleSearchFormSubmit = useCallback(async () => {
    const { id } = await searchSummoner(summonerName);
    console.log("Summoner id: " + id);
  }, [summonerName]);

  const handleSummonerNameOnChange = useCallback((e) => {
    setSummonerName(e.target.value);
  });

  return (
    <Box p={1}>
      <Container maxWidth="sm">
        <form
          className="vertical-align"
          style={{ textAlign: "center" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter summoner's name"
            variant="outlined"
            value={summonerName}
            onChange={handleSummonerNameOnChange}
          />
          <Box mx={4}>
            <Button
              onClick={handleSearchFormSubmit}
              color="primary"
              variant="contained"
            >
              Search
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default SearchBar;
