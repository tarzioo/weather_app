
"use strict";

var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 8,
        scrollable: false
    });

    var marker = new google.maps.Marker({
        position: {lat: statusLat, lng: statusLng},
        map: map,
        title: "hello"
    });
}



--------------------------------------------------------------------



    var infoWindow = new google.maps.InfoWindow({
        width: 500
    });

    //retrieve location info with ajax
    $.get('/updates.json', function (locations) {

        var location, marker, html;

        for (var key in locations) {
            location = locations[key];

            //define the marker
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.user.lat, location.user.lng),
                map: map,
                title: "test"
            });
        }
    }

var update;
 $.get('/map.json', function (updates) {
     for(var key in updates){
        update = updates[key]
        console.log(update);
        }
    });



