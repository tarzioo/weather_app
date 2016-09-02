"use strict";


var map;

function initialize() {



    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 8,
        scrollable: false,
        scrollwheel: false,
        zoomControl: false,
        styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"hue":"#00aaff"}]}]


    });

    $.get('/alert-details.json', function (alerts) {
        //json looks like this
        // if len(alert_details) > 1:
        // alert = {
        //         "alertLevel": alert_details[0],
        //         "alertType": alert_details[1]
        // }

        // else:

        //     alert = {
        //     "message": alert_details
        // }
        var alertIcon;
        var titleInfo;

        if(alerts.alertType !== undefined){
            console.log("it is not undefined");

            if(alerts.alertType === "tornado"){
                alertIcon = '/static/img/tornado-icon.png';
                titleInfo = "You are here in a status of " + alerts.alertLevel;
            }
            else if(alerts.alertType === "flood"){
                alertIcon = '/static/img/flood-icon.png';
                titleInfo = "You are here in a status of " + alerts.alertLevel;
            }
            else if(alerts.alertType === "thunderstorm"){
                alertIcon = '/static/img/thunderstorm-icon.png';
                titleInfo = "You are here in a status of " + alerts.alertLevel;
            }
        }

        else {
            console.log("it is undefined");
            alertIcon = '/static/img/no-alert-icon.png';
            titleInfo = "You are here";
            }
        

        var marker;

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                title: titleInfo,
                icon: alertIcon
            });

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

        var mapKeys = {};

        for (var key in friends) {
            update = friends[key];

            if (!mapKeys[update.postedLat + ',' + update.postedLng]) {

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(update.postedLat, update.postedLng),
                    map: map,
                    title: "Posted from: " + update.userName,
                    icon: '/static/img/friends-icon.png'
                });

                html = (
                    '<p>' + update.userName + ": " + update.post + '</p>' +
                    '<p>written at: ' + update.postedAt + '</p>' +
                    '<p>from: ' + update.postedCounty + ' county</p>');

                mapKeys[update.postedLat + ',' + update.postedLng] = {
                    marker: marker,
                    html: html
                };
            } else {
                marker = mapKeys[update.postedLat + ',' + update.postedLng].marker;
                html = (
                    '<br><p>' + update.userName + ": " + update.post + '</p>' +
                    '<p>written at: ' + update.postedAt + '</p>' +
                    '<p>from: ' + update.postedCounty + ' county</p>');
                mapKeys[update.postedLat + ',' + update.postedLng].marker.title = "Multiple posts";
                mapKeys[update.postedLat + ',' + update.postedLng].marker.icon = "/static/img/multiple-markers.png";
                mapKeys[update.postedLat + ',' + update.postedLng].html +=  html;
            }



            bindInfoWindow(marker, map, infoWindow, '<div class="window-content">' + mapKeys[update.postedLat + ',' + update.postedLng].html + '</div>');


            
            
        }

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

                if (!mapKeys[update.postedLat + ',' + update.postedLng]) {

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(update.postedLat, update.postedLng),
                        map: map,
                        title: "Posted from: " + update.userName,
                        icon: '/static/img/strangers-icon.png'
                    });

                    html = (
                    '<br><p>' + update.userName + ": " + update.post + '</p>' +
                    '<p>written at: ' + update.postedAt + '</p>' +
                    '<p>from: ' + update.postedCounty + '</p></div>');

                
                    mapKeys[update.postedLat + ',' + update.postedLng] = {
                        marker: marker,
                        html: html
                    };
                } else {
                    marker = mapKeys[update.postedLat + ',' + update.postedLng].marker;
                    html = (
                        '<br><p>' + update.userName + ": " + update.post + '</p>' +
                        '<p>written at: ' + update.postedAt + '</p>' +
                        '<p>from: ' + update.postedCounty + ' county</p>');
                    mapKeys[update.postedLat + ',' + update.postedLng].marker.title = "Multiple posts";
                    mapKeys[update.postedLat + ',' + update.postedLng].marker.icon = "/static/img/multiple-markers.png";
                    mapKeys[update.postedLat + ',' + update.postedLng].html +=  html;
                }
      

                bindInfoWindow(marker, map, infoWindow, '<div class="window-content">' + mapKeys[update.postedLat + ',' + update.postedLng].html + '</div>');


            }
        

        // bindInfoWindow(marker, map, infoWindow, '<div class="window-content">' + mapKeys[update.postedLat + ',' + update.postedLng].html + '</div>');

        });

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


