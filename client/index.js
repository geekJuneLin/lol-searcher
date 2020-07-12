const form = document.querySelector("#search");
const matchesSection = document.querySelector("#matches_content");
const nameInput = document.querySelector("#name");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  let name;
  if (nameInput) {
    name = nameInput.value;
  }
  console.log("name: " + name);

  searchSummoner(name).then(displayMatches);
}

searchSummoner = (name) => {
  return fetch(`http://localhost:5000/api/summoner/${name}`)
    .then((res) => res.json())
    .then((data) => {
      return searchMatches(data.id);
    });
};

searchMatches = (id) => {
  return fetch(`http://localhost:5000/api/match/byAccount/${id}`)
    .then((res1) => res1.json())
    .then((data1) => {
      if (data1) {
        nameInput.value = "";
        return data1.matches;
      }
    });
};

displayMatches = (matches) => {
  const tbody = document.createElement("tbody");

  matches.forEach((match) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = match.lane;
    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  matchesSection.appendChild(tbody);
  console.log(matches);
};
