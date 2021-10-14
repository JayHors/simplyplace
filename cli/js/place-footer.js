const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host{
            user-select: none;
            background: #AAA;
        }
        span{
            color: #3333AA;
        }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <span></span>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <img src="img/powered_by_google_on_white.png" />
            </div>
        </div>
    </div>
`;

class PlaceFooter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        if (!this.dataset.year) this.dataset.year = 1989;
        if (!this.dataset.text) this.dataset.text = "Bill & Ted";

        this.span = this.shadowRoot.querySelector("span");
    }
    connectedCallback() {
        this.render();
    }
    render() {
        const year = this.dataset.year;
        const text = this.dataset.text;

        this.span.innerHTML = `&copy; Copyright ${year}, <a href="https://jayhorsfall.com/">${text}</a>`;
    }
    static get observedAttributes() {
        return ["data-year", "data-text"];
    }

}
export {PlaceFooter};