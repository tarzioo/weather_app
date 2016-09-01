"use strict";

$("#login-form").on('submit', function (evt) {     
        var emailCount = $('#email-length').val().length;
        if (emailCount < 5) {
            evt.preventDefault();
             $('#error-email').html("*Email must be at least 5 characters long");
        }
    });

$("#login-form").on('submit', function (evt) {     
        var firstnameCount = $('#firstname-length').val().length;
        if (firstnameCount < 1) {
            evt.preventDefault();
             $('#error-firstname').html("*First name must be entered");
        }
    });

$("#login-form").on('submit', function (evt) {     
        var lastnameCount = $('#lastname-length').val().length;
        if (lastnameCount < 1) {
            evt.preventDefault();
             $('#error-lastname').html("*Last name must be entered");
        }
    });

$("#login-form").on('submit', function (evt) {     
        var passwordCount = $('#password-length').val().length;
        if (passwordCount < 4) {
            evt.preventDefault();
             $('#error-password').html("*password must be longer than 4 characters");
        }
    });