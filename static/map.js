"use strict";


var map;

function initialize() {



    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 8,
        scrollable: false,
        scrollwheel: false,
        zoomControl: false,


    });


    var infoWindow = new google.maps.InfoWindow({
        width: 500
    });

    $.get('/friends_map.json', function (friends) {
        //json looks like this
        // friends = {
        // status.update_id: {
        //     "UserName": status.user.first_name,
        //     "post": status.post,
        //     "postedAt": status.time,
        //     "postedCounty": status.posted_county,
        //     "postedLat": status.posted_lat,
        //     "postedLng": status.posted_lng
        // }
        var update, marker, html;

        for (var key in friends) {
            update = friends[key];

            console.log(update);

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(update.postedLat, update.postedLng),
                map: map,
                title: "Posted from: " + update.userName,
                icon: '/static/img/friends-icon.png'
            });

            html = (
                '<div class="window-content">' +
                '<p>' + update.userName + ": " + update.post + '</p>' +
                '<p>written at: ' + update.postedAt + '</p>' +
                '<p>from: ' + update.postedCounty + ' county</p></div>');

            bindInfoWindow(marker, map, infoWindow, html);

        }
    });


   $.get('/strangers_map.json', function (strangers) {
        //json looks like this
        // strangers = {
            // status.update_id: {
            //     "userName": status.user.first_name,
            //     "post": status.post,
            //     "postedAt": status.time,
            //     "postedCounty": status.posted_county,
            //     "postedLat": status.posted_lat,
            //     "postedLng": status.posted_lng
            // }

        var update, marker, html;

        for (var key in strangers) {
            update = strangers[key];

            console.log(update);

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(update.postedLat, update.postedLng),
                map: map,
                title: "Posted at: ",
                icon: '/static/img/strangers-icon.png'
            });

            html = (
                '<div class="window-content">' +
                '<br><p>' + update.userName + ": " + update.post + '</p>' +
                '<p>written at: ' + update.postedAt + '</p>' +
                '<p>from: ' + update.postedCounty + '</p></div>');

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



google.maps.event.addDomListener(window, 'load', initialize);
