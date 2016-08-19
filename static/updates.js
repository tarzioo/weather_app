
"use strict";

var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 8
    });

    var marker = new google.maps.Marker({
        position: {lat: 35.327, lng: -97.5556},
        map: map,
        title: "hello"
    });
}



