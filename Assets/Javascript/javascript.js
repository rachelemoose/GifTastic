$(document).ready(function() {

    var topic = ["Golden Retrievers", "Huskies", "Corgis", "Black Lab"];

    function Giftastic() {
        var dog = $(this).attr("data-name")
        console.log(dog)
        var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=gMkEjOv9HMeLW52jYm0p0qSSXOC50AX0&limit=10";
        console.log("Query URL: " + queryurl)
        $.ajax({
        url: queryurl,
        method: "GET"
    }).done(function(response) {
        var results = response.data
        console.log(results)
        for (var i = 0; i < results.length; i++) {
            var dogDiv = $("<div>")
            var rating = results[i].rating
            var ratingDiv = $("<div>")
            ratingDiv.addClass("ratings")
            console.log(rating)
            ratingDiv.text("Rating: " + rating)
            dogDiv.prepend(ratingDiv)
            var movingImage = results[i].images.fixed_height.url;
            console.log("Giphy: " + movingImage)
            var staticImage = results[i].images.fixed_height_still.url;
            console.log ("Static Image: " + staticImage);
            var showgif = $("<img>");
            showgif.attr("src", staticImage);
            showgif.addClass("dogGiphy");
            showgif.attr("data-state", "still");
            showgif.attr("data-still", staticImage)
            showgif.attr("data-animate", movingImage);
            dogDiv.append(showgif);
            $("#gifArea").prepend(dogDiv);


        }
            })
    };

//this function creates the buttons of the topics I have above
function renderButtons() {
    $("#animals-view").empty();
    for (var i = 0; i < topic.length; i++) {
        var a = $("<button>");
        a.addClass("dog-breed");
        a.attr("data-name", topic[i]);
        a.text(topic[i]);
        $("#animals-view").append(a);
    }
}

//this function is when the "Add a new dog!" button is clicked, it reads the value that was put into the form, the adds that value to
//the topic array, and then creates a new button for it. Then it clears the form.
$("#add-dog").on("click", function(event){
    event.preventDefault();
    var dog = $("#animal-input").val().trim();
    console.log(dog)
    topic.push(dog);
    $("#animal-input").val("");
    renderButtons();
});

function playGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

renderButtons();

$(document).on("click", ".dog-breed", Giftastic);
$(document).on("click", ".dogGiphy", playGifs);





});