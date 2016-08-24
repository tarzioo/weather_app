"use strict";

function getAlerts() {

    $.get('/alerts.json', function (response) {
        
        console.log(response);
        $('#alerts').html("Temperature: " + response.apparentTemperature + "<br>" +
                            "Humidity: " + response.humidity + "<br>" +
                            "Nearest Storm Bearing: " + response.nearestStormBearing + "<br>" +
                            "Nearest Storm Distance: " + response.nearestStormDistance + "<br>" +
                            "Summary: " + response.summary + "<br>" 
                            );  

    });
 

}

function getExtraAlerts() {

    $.get('/alerts-extra.json', function (response) {
        console.log(response);
        if(!response.message) {
            return;
        }
        $('#alerts-extra').html("Message: " + response.message);

    });
}

