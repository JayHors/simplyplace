import * as PlaceFooter from './place-footer.js'; //imports from submodules
import * as PlaceNav from './place-nav.js';
import * as PlaceObj from './place.js';
import * as PlaceCard from './place-card.js';
import * as fireDb from './firebase.js';

let callBtn = document.querySelector("#call");  //various DOM elements that need to be called
let pCard = document.querySelector("place-card");
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let saveBtn = document.querySelector("#save");
let signInBtn = document.querySelector("#GSignIn");
let signOutBtn = document.querySelector("#GSignOut");
let geo = navigator.geolocation;
let stor = localStorage;
let storKey = "jlh6319-places";
let stateKey = "jlh6319-SPstate";

let placeArray = [];
let placeIndex = 0;

//localStorage
if (!stor.getItem(storKey)) {
    stor.setItem(storKey, JSON.stringify([]));
}
if (fireDb.isSignedIn) {
    signOutBtn.disabled = false;
    signInBtn.disabled = true;
}
if (!stor.getItem(stateKey)) {
    stor.setItem(stateKey, JSON.stringify({
        checkedID: "#gas"
    }));
} else {
    let prevState = JSON.parse(stor.getItem(stateKey));
    document.querySelector(`#${prevState.checkedID}`).checked = true;
}
window.onunload = () => {
    stor.setItem(stateKey,JSON.stringify({
        checkedID: `${document.querySelector('input[name=place_type]:checked').id}`
    }));
}
//setup buttons and acquire user consent for location access
signInBtn.onclick = () => {
    fireDb.signIn();
    signInBtn.disabled = true;
    signOutBtn.disabled = false;
};
signOutBtn.onclick = () => {
    fireDb.signOut();
    signInBtn.disabled = false;
    signOutBtn.disabled = true;
};
if (geo == undefined) {
    pCard.dataset.name = "<em>Your browser doesn't support geolocation.</em>";
}
else {
    geo.getCurrentPosition(() => {
        pCard.style.visibility = "hidden";
        callBtn.disabled = false;
        callBtn.onclick = newSearchInit;
        nextBtn.onclick = () => {
            placeIndex++;
            if (placeIndex > 0 && prevBtn.disabled) {
                prevBtn.disabled = false;
            }
            if (placeIndex >= (placeArray.length - 1)) {
                nextBtn.disabled = true;
            }
            loadPlaceDetails(placeIndex);
            saveBtn.innerHTML = "Save";
        }
        prevBtn.onclick = () => {
            placeIndex -= 1;
            if (placeIndex == 0) {
                prevBtn.disabled = true;
            }
            if (placeIndex < (placeArray.length - 1) && nextBtn.disabled) {
                nextBtn.disabled = false;
            }
            loadPlaceDetails(placeIndex);
            saveBtn.innerHTML = "Save";
        }
        saveBtn.onclick = () => {
            savePlace(pCard.dataset.pid, pCard.dataset.type);
        };
    },
        () => {
            pCard.dataset.name = "<em>You need to enable location data.</em>";
        })
}


export function newSearchInit() {
    placeIndex = 0;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    saveBtn.disabled = true;
    callBtn.classList.add("is-loading");
    newGeoSearch();
}

function newGeoSearch() {
    geo.getCurrentPosition(position => geolockCallback(position));
}

async function geolockCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const placetype = document.querySelector('input[name=place_type]:checked').value;
    fetch(`https://people.rit.edu/jlh6319/330/gmp_proxy.php?request_type=nearby&location=${lat},${lng}&type=${placetype}`)
        .then(response => response.json())
        .then(async json => {
            placeArray = await PlaceObj.generatePlaces(json, placetype);
            loadPlaceDetails(placeIndex);
            callBtn.classList.remove("is-loading");
            saveBtn.disabled = false;
            if (placeArray.length > 1) nextBtn.disabled = false;
            saveBtn.innerHTML = "Save";
            pCard.style.visibility = "";
        });
}

async function loadPlaceDetails(index) {
    let place = placeArray[index];
    await place.grabThings();
    pCard.dataset.name = place.name;
    pCard.dataset.number = place.fphone;
    pCard.dataset.address = place.fadr;
    pCard.dataset.type = place.type;
    pCard.dataset.pid = place.pid;
}
function savePlace(pid, type) {
    if (fireDb.isSignedIn) {
        fireDb.addFave(pid, type);
    }
    else {
        let currentStor = JSON.parse(stor.getItem(storKey));
        currentStor.push([pid, type]);
        stor.setItem(storKey, JSON.stringify(currentStor));
    }
    saveBtn.innerHTML = "Saved!";
}
customElements.define('place-footer', PlaceFooter.PlaceFooter);
customElements.define('place-nav', PlaceNav.PlaceNav);
customElements.define('place-card', PlaceCard.PlaceCard);