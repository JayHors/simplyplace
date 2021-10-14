const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
        <a class="navbar-item" href="./">
            <img src="img/simplyplace.png" width="30" height="30">
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item is-tab" id="homeNav" href="./about.html">
                Home
            </a>

            <hr class="navbar-divider">

            <a class="navbar-item is-tab" id="appNav" href="./">
                App
            </a>

            <hr class="navbar-divider">

            <a class="navbar-item is-tab" id="favNav" href="./favorites.html">
                Favorites
            </a>

            <hr class="navbar-divider">

            <a class="navbar-item is-tab" id="docsNav" href="./docs.html">
                Docs
            </a>

        </div>

        <div class="navbar-end">
            <a class="navbar-item" href="https://maps.google.com/help/terms_maps/">
                Google Maps Platform TOS
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" href="https://www.google.com/policies/privacy/">
                Google Privacy Policy
            </a>
        </div>
    </div>
    </nav>
    <script>
`;
class PlaceNav extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        if (!this.dataset.active) this.dataset.active = "app";

    }
    connectedCallback() {
        this.render();
    }
    render() {
        const activePage = this.dataset.active;
        let activeEle = this.shadowRoot.querySelector(`#${activePage}Nav`);
        activeEle.classList.add("is-active");

        //Thanks bulma for the below!

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(this.shadowRoot.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = this.shadowRoot.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }
        //end of bulma block
    }
}
export { PlaceNav };