const roverSelection = document.querySelector(".rover_selection");

onload();

function onload() {
  fetchInformation("curiosity", "manifest");
}

roverSelection.addEventListener("change", (event) => {
  const rover = event.target.value;
  changeDisplay(rover);
  const URL_INFO = {
    fetchType: "manifest",
    roverName: rover,
  };
  fetchInformation(URL_INFO);
});

function changeDisplay(roverName) {
  const landingPage = document.querySelector(".landing-img");
  landingPage.src = `../assets/rovers/mars_${roverName}_rover.jpg`;
}

function fetchInformation(URL_INFO) {
  if (URL_INFO.fetchType === "manifest") {
    fetchManifest(URL_INFO);
  } else if (URL_INFO.fetchType === "photos") {
    fetchPhotos(URL_INFO);
  }
}

function fetchManifest(URL_INFO) {
  const baseURL = "https://api.nasa.gov/mars-photos/api/v1/manifests/";
  const apiKey = "cj41OPe4xFddhFHxeEB4iMST6rzNpBJwSpsQc5Zw";

  fetch(`${baseURL}${URL_INFO.roverName}/?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      populateSolSelection(data);
      displayManifest(data);
    });
}

function fetchRoverPhotos(URL_INFO) {
  const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
  const apiKey = "cj41OPe4xFddhFHxeEB4iMST6rzNpBJwSpsQc5Zw";

  fetch(`${baseURL}${URL_INFO.rover}/photos?sol=${URL_INFO.sol}&camera=${URL_INFO.camera}&page=1&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      displayRoverPhotos(data);
    })
    .catch((error) => console.log(error));
}

function displayManifest(data) {
  clearInformation();

  const manifestName = document.querySelector(".manifest_name");
  manifestName.append(` ${data.photo_manifest.name}`);

  const manifestLaunchDate = document.querySelector(".manifest_launch_date");
  manifestLaunchDate.append(` ${data.photo_manifest.launch_date}`);

  const manifestLandingDate = document.querySelector(".manifest_landing_date");
  manifestLandingDate.append(` ${data.photo_manifest.landing_date}`);

  const manifestStatus = document.querySelector(".manifest_status");
  manifestStatus.append(` ${data.photo_manifest.status}`);

  const manifestMaxSol = document.querySelector(".manifest_max_sol");
  manifestMaxSol.append(` ${data.photo_manifest.max_sol}`);

  const manifestMaxDate = document.querySelector(".manifest_max_date");
  manifestMaxDate.append(` ${data.photo_manifest.max_date}`);

  const manifestTotalPhotos = document.querySelector(".manifest_total_photos");
  manifestTotalPhotos.append(` ${data.photo_manifest.total_photos}`);
}

function populateSolSelection(data) {
  createSolSelectionDropDown();
  const solSelection = document.querySelector(".sol_selection");

  const solsAvailable = data.photo_manifest.photos.map((photo) => photo.sol);
  const solFragment = document.createDocumentFragment();

  solsAvailable.forEach((sol) => {
    const solOption = document.createElement("option");
    solOption.value = sol;
    solOption.textContent = sol;
    solFragment.append(solOption);
  });

  solSelection.append(solFragment);
  createEventListenerForSolSelection(data);
}

function createSolSelectionDropDown() {
  const divSolSelection = document.querySelector(".div_sol_selection");
  divSolSelection.innerHTML = "";

  const solSelectionLabel = document.createElement("label");
  solSelectionLabel.for = "sol_selection";

  const h3SolSelection = document.createElement("span");
  h3SolSelection.classList.add("h3");
  h3SolSelection.textContent = "Select a Sol: ";

  solSelectionLabel.append(h3SolSelection);

  const solSelection = document.createElement("select");
  solSelection.classList.add("sol_selection", "form-select");
  solSelection.name = "sol_selection";
  solSelection.id = "sol_selection";

  divSolSelection.append(solSelectionLabel, solSelection);
}

function createEventListenerForSolSelection(data) {
  const solSelection = document.querySelector(".sol_selection");

  solSelection.addEventListener("change", (event) => {
    const sol = event.target.value;
    displaySolPhotoInfo(data, sol);
    createCameraSelectionDropDown();
    populateCameraSelection(data, sol);
    window.scrollTo(0, document.body.scrollHeight);
  });
}

function createCameraSelectionDropDown() {
  const divCameraSelection = document.querySelector(".div_camera_selection");
  divCameraSelection.innerHTML = "";

  const cameraSelectionLabel = document.createElement("label");
  cameraSelectionLabel.for = "camera_selection";

  const h3CameraSelection = document.createElement("span");
  h3CameraSelection.classList.add("h3");
  h3CameraSelection.textContent = "Select a Rover Camera: ";

  cameraSelectionLabel.append(h3CameraSelection);

  const cameraSelection = document.createElement("select");
  cameraSelection.classList.add("camera_selection", "form-select");
  cameraSelection.name = "camera_selection";
  cameraSelection.id = "camera_selection";

  divCameraSelection.append(cameraSelectionLabel, cameraSelection);
}

function displaySolPhotoInfo(data, day) {
  const solContainer = document.querySelector(".sol_container");
  solContainer.innerHTML = "";

  const photosArrayBySol = data.photo_manifest.photos;

  const solByDay = photosArrayBySol.find((photo) => photo.sol === parseInt(day));

  const solNum = solByDay.sol;

  const sol = document.createElement("div");
  sol.classList.add("container", "text-dark");

  const solH2 = document.createElement("h2");
  solH2.classList.add(`sol_${solNum}`);
  solH2.append(`Sol: ${solNum}`);

  const solEarthDate = document.createElement("p");
  solEarthDate.classList.add(`earth_date`);
  solEarthDate.append(`Earth Date: ${solByDay.earth_date}`);

  const solTotalPhotos = document.createElement("p");
  solTotalPhotos.classList.add(`total_photos`);
  solTotalPhotos.append(`Total Photos: ${solByDay.total_photos}`);

  const solCameraListContainer = document.createElement("div");
  solCameraListContainer.classList.add(`available_cameras`);
  const solCameraListH2 = document.createElement("h2");
  solCameraListH2.append("Available Cameras");

  const solCameraList = document.createElement("ul");
  solCameraList.classList.add(`camera_list`);
  solByDay.cameras.forEach((camera) => {
    const cameraItem = document.createElement("li");
    cameraItem.append(camera);
    solCameraList.append(cameraItem);
  });

  solCameraListContainer.append(solCameraListH2, solCameraList);

  sol.append(solH2, solEarthDate, solTotalPhotos, solCameraListContainer);
  solContainer.append(sol);
}

function populateCameraSelection(data, day) {
  const cameraSelection = document.querySelector(".camera_selection");
  cameraSelection.innerHTML = "";

  const photosArrayBySol = data.photo_manifest.photos;

  const solByDay = photosArrayBySol.find((photo) => photo.sol === parseInt(day));

  const solFragment = document.createDocumentFragment();

  solByDay.cameras.forEach((camera, index) => {
    const cameraOption = document.createElement("option");
    cameraOption.value = camera;
    cameraOption.textContent = camera;
    if (index === 0) {
      cameraOption.setAttribute("selected", true);
    }
    solFragment.append(cameraOption);
  });

  cameraSelection.append(solFragment);

  createEventListenerForCameraSelection(data);
}

function createEventListenerForCameraSelection(data) {
  const cameraSelection = document.querySelector(".camera_selection");
  const solSelection = document.querySelector(".sol_selection").value;
  const roverSelection = document.querySelector(".rover_selection").value;
  // console.log(roverSelection);
  cameraSelection.addEventListener("change", (event) => {
    const camera = event.target.value;
    const URL_INFO = {
      fetchType: "photos",
      rover: roverSelection,
      sol: solSelection,
      camera: camera,
    };
    console.log(URL_INFO);
    fetchRoverPhotos(URL_INFO);
  });
}

function displayRoverPhotos(data) {
  // clearing contents
  const photoContainer = document.querySelector(".photo_container");
  photoContainer.innerHTML = "";

  // creating fragment
  const photoFragment = document.createDocumentFragment();

  // creating row
  let photoRow = document.createElement("div");
  photoRow.classList.add("row", "mx-auto");

  // looping through photos
  data.photos.forEach((photo, index) => {
    // create a column
    const photoColumn = document.createElement("div");
    photoColumn.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3");

    // create a card
    const photoCard = document.createElement("div");
    photoCard.classList.add("card");

    const photoCardImg = document.createElement("img");
    photoCardImg.classList.add("card-img-top");
    photoCardImg.src = photo.img_src;
    photoCardImg.alt = photo.camera.full_name;

    const photoCardBody = document.createElement("div");
    photoCardBody.classList.add("card-body");

    const photoCardTitle = document.createElement("h5");
    photoCardTitle.classList.add("card-title");
    photoCardTitle.append(photo.camera.full_name);

    const photoCardText = document.createElement("p");
    photoCardText.classList.add("card-text");
    photoCardText.append(`Earth Date: ${photo.earth_date}`);

    photoCardBody.append(photoCardTitle, photoCardText);
    photoCard.append(photoCardImg, photoCardBody);

    // append card to column
    photoColumn.append(photoCard);

    // append column to row
    photoRow.append(photoColumn);

    // append row to fragment
    photoFragment.append(photoRow);

    // only three elements per row will be shown
    if ((index + 1) % 3 === 0 || index === data.photos.length - 1) {
      photoContainer.append(photoRow);
      // create a new row
      photoRow = document.createElement("div");
      photoRow.classList.add("row");
    }
  });

  photoContainer.append(photoFragment);
}

function clearInformation() {
  const manifestName = document.querySelector(".manifest_name");
  manifestName.innerHTML = `<strong>Name: .......... </strong>`;

  const manifestLaunchDate = document.querySelector(".manifest_launch_date");
  manifestLaunchDate.innerHTML = `<strong>Launch Date: .......... </strong>`;

  const manifestLandingDate = document.querySelector(".manifest_landing_date");
  manifestLandingDate.innerHTML = `<strong>Landing Date: .......... </strong>`;

  const manifestStatus = document.querySelector(".manifest_status");
  manifestStatus.innerHTML = `<strong>Status: .......... </strong>`;

  const manifestMaxSol = document.querySelector(".manifest_max_sol");
  manifestMaxSol.innerHTML = `<strong>Max Sol: .......... </strong>`;

  const manifestMaxDate = document.querySelector(".manifest_max_date");
  manifestMaxDate.innerHTML = `<strong>Max Date: .......... </strong>`;

  const manifestTotalPhotos = document.querySelector(".manifest_total_photos");
  manifestTotalPhotos.innerHTML = `<strong>Total Photos: .......... </strong>`;

  const solContainer = document.querySelector(".sol_container");
  solContainer.innerHTML = "";
}
