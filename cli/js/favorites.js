import * as PlaceFooter from './place-footer.js'; //imports from submodules
import * as PlaceNav from './place-nav.js';
import * as fireDb from './firebase.js';

customElements.define('place-footer', PlaceFooter.PlaceFooter);
customElements.define('place-nav', PlaceNav.PlaceNav);

let colDiv = document.querySelector("#colCont");
let htmlStr = "";
let favoritesArray;
let signInBtn = document.querySelector("#GSignIn");
let signOutBtn = document.querySelector("#GSignOut");
let deleteBtn = document.querySelector("#delete");

if(fireDb.isSignedIn){
    signOutBtn.disabled = false;
    signInBtn.disabled = true;
    favoritesArray = await fireDb.getFaves();
}
else{
    favoritesArray = JSON.parse(localStorage.getItem("jlh6319-places"));
}
signInBtn.onclick = () => {
    fireDb.signIn();
    signInBtn.disabled = true;
    signOutBtn.disabled = false;
    alert("Reload the page to see your synced favorites.");
};
signOutBtn.onclick = () => {
    fireDb.signOut();
    signInBtn.disabled = false;
    signOutBtn.disabled = true;
    location.reload();
};
for(let favorite of favoritesArray){
    let details = await fetch(`https://people.rit.edu/jlh6319/330/gmp_proxy.php?request_type=detail&place_id=${favorite[0]}&details=name,formatted_address`);
    details = await details.json();
    htmlStr += `
        <div class="column is-one-quarter">
            <div class="card">
                <div class="card-header">
                    <div class="card-header-title">
                        ${details.result.name}
                    </div>
                </div>
                <div class="card-content">
                <div>Address: ${details.result.formatted_address}</div>
                <a class="button is-info" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.result.formatted_address)}&query_place_id=${favorite[0]}">Google Maps</a>
                </div>
            </div>
        </div>
    `;
}

colDiv.innerHTML = htmlStr;

deleteBtn.classList.remove("is-loading");
deleteBtn.disabled = false;
deleteBtn.onclick = async() => {
    await fireDb.deleteFaves();
    localStorage.setItem("jlh6319-places", JSON.stringify([]));
    alert("Favorites cleared, page will reload.");
    location.reload();
}