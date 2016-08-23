"use strict";

function getAlerts() {

    $.get('/alerts.json', function (response) {
        
        console.log(response);
        $('#alerts').html("Temperature: " + response['apparentTemperature'] + "<br>" +
                            "Humidity: " + response['humidity'] + "<br>" +
                            "Nearest Storm Bearing: " + response["nearestStormBearing"] + "<br>" +
                            "Nearest Storm Distance: " + response["nearestStormDistance"] + "<br>" +
                            "Summary: " + response["summary"] + "<br>" 
                            );  

    });
 

}

function getExtraAlerts() {

    $.get('/alerts-extra.json', function (response) {
        console.log(response);
        $('#alerts-extra').html("Alerts: " + response['alerts']);

    });
}

