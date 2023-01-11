const BASE_URL = `https://rickandmortyapi.com/api/character`;

const NASA_API_KEY = `DEMO_KEY`;
const NASA_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

fetchAPIresponse(BASE_URL);

function fetchAPIresponse(url) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      displayResponse(response);
    })
    .catch(displayError);
}

function displayResponse({ results }) {
  const characters = results;
  createPlanetCards(characters);
}

function createPlanetCards(planetInfo) {
  const planetCards = document.querySelectorAll(".planet-card");

  // ! The code below works. Do not change it.
  for (let i = 0; i < planetCards.length; i++) {
    if (planetCards[i].className.includes("mars")) {
      planetCards[i].querySelector("img").src = planetInfo[0].image;
      planetCards[i].querySelector("img").alt = planetInfo[0].name;
      const planetCardBody = planetCards[i].querySelector(".card-body");
      const planetNameH5 = planetCardBody.querySelector(".card-title");
      planetNameH5.textContent = planetInfo[0].name;
      const planetDescriptionP = planetCardBody.querySelector(".card-text");
      planetDescriptionP.textContent = planetInfo[0].status;
      const planetButtonA = planetCardBody.querySelector(".btn");
      planetButtonA.textContent = `Origin - ${planetInfo[0].origin.name}`;
      planetButtonA.href = planetInfo[0].origin.url;

      planetButtonA.addEventListener("click", (event) => {
        event.preventDefault();
        fetch(event.target.href)
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
          })
          .catch(displayError);
      });
    }

    if (planetCards[i].className.includes("earth")) {
      planetCards[i].querySelector("img").src = planetInfo[1].image;
      planetCards[i].querySelector("img").alt = planetInfo[1].name;
      const planetCardBody = planetCards[i].querySelector(".card-body");
      const planetNameH5 = planetCardBody.querySelector(".card-title");
      planetNameH5.textContent = planetInfo[1].name;
      const planetDescriptionP = planetCardBody.querySelector(".card-text");
      planetDescriptionP.textContent = planetInfo[1].status;
    }

    if (planetCards[i].className.includes("jupiter")) {
      planetCards[i].querySelector("img").src = planetInfo[2].image;
      planetCards[i].querySelector("img").alt = planetInfo[2].name;
      const planetCardBody = planetCards[i].querySelector(".card-body");
      const planetNameH5 = planetCardBody.querySelector(".card-title");
      planetNameH5.textContent = planetInfo[2].name;
      const planetDescriptionP = planetCardBody.querySelector(".card-text");
      planetDescriptionP.textContent = planetInfo[2].status;
    }
  }
}

function displayError(error) {
  console.log(error);
}

fetch(NASA_API_URL)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    displayNasaResponse(response);
  })
  .catch(displayError);

function displayNasaResponse({ url, title, explanation }) {
  const nasaImage = document.querySelector(".nasa-image");
  nasaImage.src = url;
  nasaImage.alt = title;
  const nasaDescription = document.querySelector(".nasa-description");
  nasaDescription.textContent = explanation;
}
