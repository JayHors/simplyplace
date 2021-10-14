import * as PlaceFooter from './place-footer.js'; //imports from submodules
import * as PlaceNav from './place-nav.js';

customElements.define('place-footer', PlaceFooter.PlaceFooter);
customElements.define('place-nav', PlaceNav.PlaceNav);

let colDiv = document.querySelector("#colCont");
let htmlStr = "";
let favoritesArray = JSON.parse(localStorage.getItem("jlh6319-places"));

for(let favorite of favoritesArray){
    htmlStr += `
        <div class="column is-one-quarter">
            <div class="card">
                <div class="card-header">
                    <div class="card-header-title">
                        A place of ${favorite[1]} type
                    </div>
                </div>
                <div class="card-content">
                <a class="button is-info" href="https://www.google.com/maps/place/?q=place_id:${favorite[0]}">Place on Google Maps</a>
                </div>
            </div>
        </div>
    `;
}

colDiv.innerHTML = htmlStr;

document.querySelector("#delete").onclick = () => {
    localStorage.setItem("jlh6319-places", JSON.stringify([]));
    alert("Favorites cleared, page will reload.");
    location.reload();
}