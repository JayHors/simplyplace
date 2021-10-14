let stor = localStorage;
let storKey = "jlh6319-places";
class placeObj {
    pid;
    type;
    name;
    fadr;
    fphone;
    constructor(pid, ptype) {
        this.pid = pid;
        this.type = ptype;
        this.name = "";
        this.fadr = "";
        this.fphone = "";
    }
    async grabThings(){
        if(this.name == "" || this.fphone == "" || this.fadr == ""){
            let details = await fetch(`https://people.rit.edu/jlh6319/330/gmp_proxy.php?request_type=detail&place_id=${this.pid}`);
            details = await details.json();
            this.name = details.result.name;
            this.fadr = details.result.formatted_address;
            this.fphone = details.result.formatted_phone_number;
        }
    }
}

async function generatePlaces(json, ptype) {
    let rtnAr = [];
    for(const result in json.results){
        let pid = json.results[result].place_id;
        let newPlace = new placeObj(pid, ptype);
        rtnAr.push(newPlace);
    }
    return rtnAr;
}


export {placeObj, generatePlaces};