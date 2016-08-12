"use strict";

function showChangedZipcode(result) {
    alert("Changed zipcode");

}

function changeZipcode(evt) {
    evt.preventDefault();

    var textInput = {
        "zipcode": $("#change-zipcode-field").val()
    };

    $.post("/update-zipcode", textInput, showChangedZipcode);
    //reloads the page after the ajax call
    window.location.reload();
    
}
$("#button-zipcode").on("click", changeZipcode);


function showNewUpdate(result) {
    alert("New post updated");
}

function postUpdate(evt) {
    evt.preventDefault();

    var textInput = {
        "post": $("#post-update-field").val()
    };

    $.post("/update-post", textInput, showNewUpdate);
    //reloads the page after the ajax call
    window.location.reload();

}

$("#button-update").on("click", postUpdate);


// function showSearchComplete(result) {
//     alert("search completed")
// }

//     function friendSearch(evt) {
//         evt.preventDefault();

//         var textInput = {
//             "email": $("#friend-search-input").val()
//         };

//         $.post("/friend-search", textInput, showNewUpdate);
//             var email = 
//         $("#friend-search-results").html(email)
//         //reloads the page after the ajax call
//         window.location.reload();
//     }

//     $("button-friend-search").on("click", friendSearch);
