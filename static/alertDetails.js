"use strict";


function getAlertDetails(evt) {
    evt.preventDefault();

    $.get('/alert-details.json', function (response) {
        console.log(response);
            if(response.message !== -1){
            $('#alert-details').html("You are in a " + response.alertType +
                                        " " + response.alertLevel );
        }
        else {
            $("#alert-details").html(response.alertType);

        }

    });
                
}

$(document).on('ready', getAlertDetails);
