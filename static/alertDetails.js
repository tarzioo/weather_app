"use strict";


function getAlertDetails(evt) {
    evt.preventDefault();

    $.get('/alert-details.json', function (response) {
        console.log(response);
       
           
        $('#alert-details').html("You are in a " + response.alertType +
                                    " " + response.alertLevel );

    });
        
        
}

$(document).on('ready', getAlertDetails);
