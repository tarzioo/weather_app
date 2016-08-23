"use strict";

function getAlerts() {

    $.get('/alerts.json', function (response) {
        
        console.log(response);
        $('#alerts').html("humidity: " + response['currently']['humidity']);  

    });


    
    

}

