"use strict";


function getAlertDetails(evt) {
    evt.preventDefault();
    var url;

    $.get('/alert-details.json', function (response) {
        console.log(response);
        
            if(response.alertType !== undefined){
                if(response.alertType == "thunderstorm") {
                    url = "<img src='/static/img/thunderstorm-icon.png'/>";
                }
                else if(response.alertType == "flood") {
                    url = "<img src='/static/img/flood-icon.png'/>";
                }
                else if(response.alertType == "tornado") {
                    url = "<img src='/static/img/tornado-icon.png'/>";

                }
                $('#alert-details').html("You are in a " + response.alertType +
                                            " " + response.alertLevel +
                                            url
                                            );


            }
            else {
                $("#alert-details").html(response.alertType);
        }
    });                
}

$(document).on('ready', getAlertDetails);


