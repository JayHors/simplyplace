const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="card">
        <header class="card-header">
            <div class="card-header-title title">
                
            </div>
        </header>
        <div class="card-content">
            <div class="content has-text-centered">
                
            </div>
        </div>
        <div class="card-footer">
            <slot></slot>
            <slot></slot>
            <slot></slot>
        </div>
    </div>
`;
class PlaceCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        if(!this.dataset.name) this.dataset.name = "Waiting for input... (Make sure you allow location when prompted!)";

        this.dataset.number = "";
        this.dataset.address = "";
        this.dataset.type = "";
        this.dataset.pid = "";

        this.titleElement = this.shadowRoot.querySelector(".card-header-title");
        this.content = this.shadowRoot.querySelector(".content");
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(attributeName, oldVal, newVal) {
        this.render();
    }
    render(){
        const name = this.dataset.name;
        const number = this.dataset.number;
        const address = this.dataset.address;
        const type = this.dataset.type;
        const pid = this.dataset.pid;

        this.titleElement.innerHTML = `${name}`;

        this.content.innerHTML = `
            Phone Number: ${number} <br/>
            Address: ${address} <br/>
            Place type: ${type} <br/>
            <a class="button is-info" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}&query_place_id=${encodeURIComponent(pid)}" target="_blank">Place on Google Maps</a>
        `;
    }
    static get observedAttributes(){
        return ["data-name", "data-number", "data-address", "data-type", "data-pid"];
    }
}
export{PlaceCard};