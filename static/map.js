

"use strict";

var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 8,
        scrollable: false,
        scrollwheel: false,
        zoomControl: false,

    });


    var infoWindow = new google.maps.InfoWindow({
        width: 1000
    });

    $.get('/map.json', function (updates) {
        //json looks like this
        // updates = {
        // update.update_id: {
        //     "UserName": update.user_id,
        //     "post": update.post,
        //     "userName": update.user.first_name,
        //     "userLat": update.user.location.lat,
        //     "userLng": update.user.location.lng
        // }
        var update, marker, html;

        for (var key in updates) {
            update = updates[key];

            console.log(update);

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(update.userLat, update.userLng),
                map: map,
                title: "User Name: " + update.userName,
                icon: '/static/img/tornado-icon.png'
            });

            html = (
                '<div class="window-content">' +
                '<br><p>' + update.userName + ": " + update.post + '</p>' +
            '</div>');

            bindInfoWindow(marker, map, infoWindow, html);

        }
    });

    function bindInfoWindow(marker, map, infoWindow, html) {
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.close();
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
        });
    }

}

google.maps.event.addDomListener(window, 'load', initMap);
