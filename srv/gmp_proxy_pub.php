<?php
$location = "0,0";
$type = "gas_station";
$request_type = "nearby";
$place_id = "nothing";
$details = "place_id";
$API_KEY = "";
if (array_key_exists('request_type', $_REQUEST)) {
    if ($_REQUEST['request_type'] == 'nearby') {
        if (array_key_exists('location', $_REQUEST) && (array_key_exists('type', $_REQUEST))) {    //requires all fields, even those normally optional in the GMP Find Place API
            $location = $_REQUEST['location'];
            $type = $_REQUEST['type'];
            $url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=$location&type=$type&rankby=distance&key=$API_KEY";
            sendRequest($url);
        }
        else{
            echo "You need valid nearby search parameters!";
            die();
        }
    }
elseif($_REQUEST['request_type'] == 'detail'){
        if(array_key_exists('place_id', $_REQUEST)){
            $place_id= $_REQUEST['place_id'];
            if(array_key_exists('details', $_REQUEST)){ // allows for user to not specify details and get default details
                $details = $_REQUEST['details'];
            }
            else{
                $details = "formatted_address,name,formatted_phone_number,photo,place_id";
            }
            $url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=$place_id&fields=$details&key=$API_KEY";
            sendRequest($url);
        }
        else{
            echo "You need a place ID parameter!";
            die();
        }
    }
} else {
    echo "You need a valid type parameter!";
    die();
}


function sendRequest($url){
    header('content-type:application/json');      // tell the requestor that this is JSON
    header("Access-Control-Allow-Origin: *");     // turn on CORS
    echo file_get_contents($url);
    die();
}
