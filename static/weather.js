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




function showSearchComplete(user) {
    alert("search completed");
    $("#friend-search-results").html(user.first_name);
}

    function friendSearch(evt) {
        evt.preventDefault();

        var textInput = {
            "email": $("#friend-search-field").val()
        };

        $.post("/friend-search", textInput, showSearchComplete);
             
        
        //reloads the page after the ajax call
        //window.location.reload();
    }

    $("#button-friend-search").on("click", friendSearch);


    // function showResults(result) {
    //     $("friend-search-results").html(result.email);

    // }

    // function friendSearch() {
    //     $.get("/friend-search", result);
    // }

    // $("button-friend-search").on("click", friendSearch)
