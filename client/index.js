import { searchSummoner, searchMatches, getChampionName } from "./API.js";

const form = document.querySelector("#search");
const matchesSection = document.querySelector("#matches_content");
const nameInput = document.querySelector("#name");

form.addEventListener("submit", handleSummonerNameSearch);

// handle the summoner name search actioon
async function handleSummonerNameSearch(e) {
  e.preventDefault();

  let summonerName;
  if (nameInput) {
    summonerName = nameInput.value;
  }

  const { name, id } = await searchSummoner(summonerName);

  const { matches } = await searchMatches(id);

  displayMatches(matches);
}

// @desc    display the info of every single match
// @param   The array of the matches
const displayMatches = async (matches) => {
  matches.forEach(async (match) => {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td.innerHTML = match.lane;
    const { name: championName } = await getChampionName(match.champion);

    td1.innerHTML = championName;
    td2.innerHTML = "";

    tr.appendChild(td2);
    tr.appendChild(td1);
    tr.appendChild(td);
    matchesSection.appendChild(tr);
  });
};
