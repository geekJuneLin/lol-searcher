// @desc    search the summoner's info by it's summoner name
// @return  Return the { level, name, id }
const searchSummoner = async (name) => {
  const data = await fetch(`http://localhost:5000/api/summoner/${name}`);
  return data.json();
};

// @desc    search the match by the match id
// @return  Return an array of matches
const searchMatches = async (id) => {
  const matches = await fetch(
    `http://localhost:5000/api/match/byAccount/${id}`
  );
  return matches.json();
};

// @desc    get the champion name by its id
// @return  Return the name of the champion by the id
const getChampionName = async (id) => {
  const championName = await fetch(`http://localhost:5000/api/champion/${id}`);
  return championName.json();
};

export { searchSummoner, searchMatches, getChampionName };
