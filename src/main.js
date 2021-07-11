//==============Load next page if scroll at bottom==

const content = document.querySelector(".content");
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    console.log("miau");

    let newUrl = getUrl();
    fetch(newUrl)
      .then((resp) => resp.json())
      .then((data) => {
        //throw new Error("An error occured");
        const nextPage = data.info.next; //info is name of array from api results
        setUrl(nextPage);
        fetchCharList();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//===============Create fetch data button===

const formElemenrDetchDataBtn = document.querySelector(".search__filter");
formElemenrDetchDataBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  setUrl("https://rickandmortyapi.com/api/character/");
  fetchCharList();
});

//=============Fetch data of character list====

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

//==============Crete character cards===

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
