"use strict";

function getAlerts() {

$.get('/alerts.json', function (alerts) {
    console.log(alerts);
    
});
}