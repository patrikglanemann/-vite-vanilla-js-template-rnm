const url = "https://rickandmortyapi.com/api/character/";

const content = document.querySelector(".content");

const fetchDataBtn = document.createElement("button");
fetchDataBtn.classList.add("content__fetch-btn");
fetchDataBtn.textContent = "Fetch Data";
content.append(fetchDataBtn);
fetchDataBtn.addEventListener("click", () => {
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
});
