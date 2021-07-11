const content = document.querySelector(".content");

//==============Load next page if scroll at bottom==

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
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
  let url = "https://rickandmortyapi.com/api/character/";
  if (formElemenrDetchDataBtn.status.value === "Alive") {
    url = `${url}?status=alive`;
  } else if (formElemenrDetchDataBtn.status.value === "Dead") {
    url = `${url}?status=dead`;
  } else if (formElemenrDetchDataBtn.status.value === "Unknown") {
    url = `${url}?status=unknown`;
  }

  if (formElemenrDetchDataBtn.status.value === "All") {
    url = `${url}?name=${formElemenrDetchDataBtn.name.value}`;
  } else {
    url = `${url}&name=${formElemenrDetchDataBtn.name.value}`;
  }
  setUrl(url);
  clearCharList();
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

//==============Create character cards===

function createCharCards(characterList) {
  console.log(characterList);
  const divWrapper = document.createElement("div");
  divWrapper.classList.add("content__wrapper");
  characterList.map((character) => {
    const section = document.createElement("section");
    section.classList.add("character-card");

    const h2 = document.createElement("h2");
    h2.classList.add("character-card__name");
    h2.textContent = character.name;

    const img = document.createElement("img");
    img.classList.add("character-card__image");
    img.src = character.image;
    img.alt = `Picture of ${character.name}`;
    section.append(img);
    section.append(h2);
    divWrapper.append(section);
  });
  content.append(divWrapper);
  content.classList.add("content--filled");
}

//===================clear character list===

function clearCharList() {
  const divWrapper = document.querySelectorAll(".content__wrapper");
  if (content.classList.contains("content--filled")) {
    content.classList.remove("content--filled"); //if 404, class would still be "content-filled", but no div exists. That is why it needs to be removed as well!
    divWrapper.forEach((div) => {
      div.remove();
    });
  }
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
