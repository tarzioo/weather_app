"use strict";


function getAlertDetails(evt) {
    evt.preventDefault();

    $.get('/alert-details.json', function (response) {
        console.log(response);
            if(response.alertType !== undefined){
                $('#alert-details').html("You are in a " + response.alertType +
                                            " " + response.alertLevel );
            }
            else {
                $("#alert-details").html(response.alertType);
        }
    });                
}

$(document).on('ready', getAlertDetails);
