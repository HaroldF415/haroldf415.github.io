const BASE_URL = `https://rickandmortyapi.com/api/character`;
// const diandreMiller = "https://api-ninjas.com/v1/exercises?muscle=biceps";

fetch(BASE_URL)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    displayResponse(response);
  })
  .catch(displayError);

function displayError(error) {
  console.log(error);
}

function displayResponse({ results }) {
  const characters = results;
  // const planetCards = document.querySelectorAll(".planet-card");

  // planetCards.forEach((planetCard) => {
  //   if (planetCard.className.includes("mars")) {
  //     const marsImage = document.createElement("img");
  //     marsImage.src = characters[0].image;
  //     marsImage.alt = characters[0].name;
  //     planetCard.append(marsImage);
  //   } else if (planetCard.className.includes("earth")) {
  //     const earthImage = document.createElement("img");
  //     earthImage.src = characters[1].image;
  //     earthImage.alt = characters[1].name;
  //     planetCard.append(earthImage);
  //   } else if (planetCard.className.includes("jupiter")) {
  //     const jupiterImage = document.createElement("img");
  //     jupiterImage.src = characters[2].image;
  //     jupiterImage.alt = characters[2].name;
  //     planetCard.append(jupiterImage);
  //   }
  // });

  const planetCardsContainer = document.querySelector(".container");

  createPlanetCards(characters);
}

/* <div class="col-md card" style="width: 18rem">
<img src="" alt="" class="card-img-top" />
<div class="card-body">
  <h5 class="card-title"></h5>
  <p class="card-text"></p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div> */

function createPlanetCards(planetInfo) {
  const planetCards = document.querySelectorAll(".planet-card");
  // console.log(planetCards[0].querySelector("img"));

  //planetCards[0].querySelector("img").src = planetInfo[0].image;
  // if (planetCards[0].className.includes("mars")) {
  //   planetCards[0].querySelector("img").src = planetInfo[0].image;
  //   planetCards[0].querySelector("img").alt = planetInfo[0].name;
  // }

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
            console.log(response);
            //planetDescriptionP.textContent = response.dimension;
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

  // planetCards.forEach((planetCard) => {
  //   if (planetCard.className.includes("mars")) {
  //     const marsImage = planetCard.querySelector("img");
  //     marsImage.src = planetInfo[0].image;
  //     marsImage.alt = planetInfo[0].name;
  //     planetCard.append(marsImage);

  //     const planetCardBody = planetCard.querySelector(".card-body");

  //     const planetNameH5 = planetCardBody.querySelector(".card-title");
  //     planetNameH5.textContent = planetInfo[0].name;

  //     const planetDescriptionP = planetCardBody.querySelector(".card-text");
  //     planetDescriptionP.textContent = planetInfo[0].status;

  //     const planetButtonA = planetCardBody.querySelector(".btn");
  //     planetButtonA.textContent = `Origin - ${planetInfo[0].origin.name}`;
  //     planetButtonA.href = origin.url;
  //   } else if (planetCard.className.includes("earth")) {
  //     const earthImage = planetCard.querySelector("img");
  //     earthImage.src = planetInfo[1].image;
  //     earthImage.alt = planetInfo[1].name;
  //     planetCard.append(earthImage);
  //   } else if (planetCard.className.includes("jupiter")) {
  //     const jupiterImage = planetCard.querySelector("img");
  //     jupiterImage.src = planetInfo[2].image;
  //     jupiterImage.alt = planetInfo[2].name;
  //     planetCard.append(jupiterImage);
  //   }
  // });

  // const planetCardDIV = document.createElement("div");
  // planetCardDIV.classList.add("col-md", "card", "planet-card", planetInfo.name);
  // planetCardDIV.style.width = "18rem";

  // const planetIMG = document.createElement("img");
  // planetIMG.src = planetInfo.image;
  // planetIMG.alt = planetInfo.name;
  // planetIMG.classList.add("card-img-top");

  // const planetCardBodyDIV = document.createElement("div");
  // planetCardBodyDIV.classList.add("card-body");

  // const planetNameH5 = document.createElement("h5");
  // planetNameH5.classList.add("card-title");
  // planetNameH5.textContent = planetInfo.name;

  // const planetDescriptionP = document.createElement("p");
  // planetDescriptionP.classList.add("card-text");
  // planetDescriptionP.textContent = planetInfo.description;

  // const planetButtonA = document.createElement("a");
  // planetButtonA.classList.add("btn", "btn-primary");
  // planetButtonA.href = "#";

  // planetCardBodyDIV.append(planetNameH5, planetDescriptionP, planetButtonA);

  // planetCardDIV.append(planetIMG, planetCardBodyDIV);

  // planetCards.push(planetCardDIV);

  // return planetCards;
}
// characters.forEach((character) => {
//   const characterElement = document.createElement("div");
//   characterElement.classList.add("character");

//   const characterImage = document.createElement("img");
//   characterImage.src = character.image;
//   characterImage.alt = character.name;

//   const characterName = document.createElement("h2");
//   characterName.textContent = character.name;

//   const characterId = document.createElement("p");
//   characterId.textContent = `ID# - 00${character.id}`;

//   const characterStatus = document.createElement("p");
//   characterStatus.textContent = `Status - ${character.status}`;

//   const characterSpecies = document.createElement("p");
//   characterSpecies.textContent = `Species - ${character.species}`;

//   const characterGender = document.createElement("p");
//   characterGender.textContent = `Gender - ${character.gender}`;

//   const characterOrigin = document.createElement("p");
//   characterOrigin.textContent = `Origin - ${character.origin.name}`;

//   const characterCurrentLocation = document.createElement("p");
//   characterCurrentLocation.textContent = `Current Location - ${character.location.name}`;

//   characterElement.append(characterImage, characterName, characterId, characterStatus, characterSpecies, characterGender, characterOrigin, characterCurrentLocation);

//   document.body.append(characterElement);
// });

// how to open a folder from the command line on finder
// open .
