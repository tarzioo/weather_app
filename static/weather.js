"use strict";

function showChangedZipcode(result) {
    $('#alert-update-zipcode').css('visibility', 'visible');
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
    $('#alert-update-posted').css('visibility', 'visible');
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
    $("#friend-search").hide();

    $("#friend-search-results").html(
        "We found " + user.first_name + " " + user.last_name + 
        "<form id='add-friend'><input id='hidden-friend' type='hidden' name='friend' value='"+user.friend_id+"'><button id='adding-friend' type='button'>Add "+user.first_name+" to friends</button></form>"
            );

    console.log("finished finding friend");
    console.log(user);


    $("#adding-friend").on("click", addFriend);



}
   

function showFriendAdded(result) {
    $('#alert-friend-added').css('visibility', 'visible');


}


function addFriend(evt) {
    console.log("entered addFriend function");
    //var friendInput = $('#hidden-friend').val();
    var friendInput = {
        'friend_id': $('#hidden-friend').val()
    };
    console.log(friendInput);
    evt.preventDefault();
    var value = $('input:radio[name=addfriend]:checked').val();

    if(value === 'yes'){
        console.log("yes, add friend");
    }

    $.post("/add-friend", friendInput, showFriendAdded);
    window.location.reload();


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

