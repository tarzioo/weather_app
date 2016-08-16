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


///////////////////////////////////////////////////////////////////


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


////////////////////////////////////////////////////////////////////////


function showSearchComplete(user) {
    alert("search completed");
    $("#friend-search-results").html(
        "We found " + user.first_name + " " + user.last_name + 
        "<br>Did you want to add them to your friends?<br><form id='add-friend'><input type='hidden' name='friend' value='user'><input type='radio' name='addfriend' checked='checked' value='yes'>Yes</input><input type='radio' name='addfriend' value='no'>No</input><button id='adding-friend' type='button'>Submit</button></form>"
            );
    console.log("finished finding friend");
    console.log(user);
    $("#adding-friend").on("click", addFriend);

}
   

function showFriendAdded(result) {
    alert("Friend has been added");
}


function addFriend(evt) {
    console.log("entered addFriend function");

    evt.preventDefault();
    var value = $('input:radio[name=addfriend]:checked').val();
    console.log(value);

    $.post("/add-friend", value, showFriendAdded);
    console.log(value);

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

