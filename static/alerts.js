"use strict";

function getAlerts() {


    $.get('/alerts.json', function (response) {
        
        console.log(response);
        $('#alerts').html("Temperature: " + response.apparentTemperature + "<br>" +
                            "Humidity: " + response.humidity + "<br>" +
                            // "Nearest Storm Bearing: " + response.nearestStormBearing + "<br>" +
                            "Nearest Storm Distance: " + response.nearestStormDistance + "<br>" +
                            "Summary: " + response.summary + "<br><br><br>" 
                            );  

    });


}

function getExtraAlerts() {

    $.get('/alerts-extra.json', function (response) {
        console.log(response);
        
        
        $('#alerts-extra').html("Description: " + response.description + "<br><br><br>" +
                                "Date: " + response.date + "<br><br>" + 
                                "message: " + response.message);

    });
}

$(document).on('ready', getAlerts);
$(document).on('ready', getExtraAlerts);
// });



