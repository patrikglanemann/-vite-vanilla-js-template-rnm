const url = "https://rickandmortyapi.com/api/character/";

const content = document.querySelector(".content");
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    console.log("miau");

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //throw new Error("An error occured");
        const nextPage = data.info.next; //info is name of array from api results
        getChars(nextPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const fetchDataBtn = document.createElement("button");
fetchDataBtn.classList.add("content__fetch-btn");
fetchDataBtn.textContent = "Fetch Data";
content.append(fetchDataBtn);
fetchDataBtn.addEventListener("click", () => {
  let newUrl = setUrl("https://rickandmortyapi.com/api/character/");
  fetchCharList(newUrl);
});

function fetchCharList() {
  const newUrl = getUrl();
  fetch(newUrl)
    .then((resp) => resp.json())
    .then((data) => {
      //throw new Error("An error occured");
      const characterList = data.results; //results is name of array from api results
      createCharCards(characterList);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createCharCards(characterList) {
  console.log(characterList);
  characterList.map((character) => {
    const section = document.createElement("section");
    section.classList.add("character");

    const h2 = document.createElement("h2");
    h2.textContent = character.name;

    const img = document.createElement("img");
    img.src = character.image;
    img.alt = `Picture of ${character.name}`;
    section.append(h2);
    section.append(img);
    content.append(section);
  });
}

function getChars(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      //throw new Error("An error occured");
      const characterList = data.results; //results is name of array from api results
      characterList.map((character) => {
        const section = document.createElement("section");
        section.classList.add("character");

        const h2 = document.createElement("h2");
        h2.textContent = character.name;

        const img = document.createElement("img");
        img.src = character.image;
        img.alt = `Picture of ${character.name}`;
        section.append(h2);
        section.append(img);
        content.append(section);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function setUrl(newUrl) {
  try {
    localStorage.setItem("currentUrl", JSON.stringify(newUrl));
  } catch (error) {
    console.log(error);
    alert("There was an error while saving current Url");
  }
}

function getUrl() {
  let currentUrl = JSON.parse(localStorage.getItem("currentUrl"));
  if (currentUrl === null) {
    currentUrl = [];
  }

  return currentUrl;
}
