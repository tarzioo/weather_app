"use strict";


function getAlertDetails(evt) {
    evt.preventDefault();
    var url;
    var cssClass;
    var cssStorm;

    $.get('/alert-details.json', function (response) {
        console.log(response);
        if(response.alertLevel !== undefined){
            if(response.alertLevel == "advisory") {
                cssClass = "advisory";
            } 
            else if(response.alertLevel == "warning") {
                cssClass = "warning";
            } 
            else if(response.alertLevel == "watch") {
                cssClass = "watch";
            }
        }
        if(response.alertType !== undefined){
            if(response.alertType == "thunderstorm") {
                url = "<img src='/static/img/thunderstorm-icon.png'/>";
                cssStorm = "thunderstorm";
            }
            else if(response.alertType == "flood") {
                url = "<img src='/static/img/flood-icon.png'/>";
               cssStorm = "flood";
            }
            else if(response.alertType == "tornado") {
                url = "<img src='/static/img/tornado-icon.png'/>";
                cssStorm = "tornado";

            }
            $('#alert-details').html("You are in a " + response.alertType +
                                        " " + response.alertLevel +
                                        url
                                        );
            $('#alert-details').attr("class", cssClass);
        }

        else {
            $("#alert-details").html(response.alertType);
        }
    });                
}

$(document).on('ready', getAlertDetails);


