//init chosen
$(".chosen-select").chosen({disable_search_threshold: 10})

// In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
// In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

$("#submit").on("click", (event) => {
    //event.preventDefault();

    // Here we grab the form elements
    let surveyResults = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        q1: $("#q1").val().trim(),
        q2: $("#q2").val().trim(),
        q3: $("#q3").val().trim(),
        q4: $("#q4").val().trim(),
        q5: $("#q5").val().trim(),
        q6: $("#q6").val().trim(),
        q7: $("#q7").val().trim(),
        q8: $("#q8").val().trim(),
        q9: $("#q9").val().trim(),
        q10: $("#q10").val().trim()
    };

    console.log(surveyResults);

    //check if photo is a photo url
    const checkURL = (url) => {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    let isPhoto = checkURL(surveyResults.photo)

    //check entire 

    // This line is the magic. It"s very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a tables is available or not.
    $.post("/api/tables", surveyResults, (data) => {
        console.log(data)    

        // Clear the form when submitting
        $("#name").val(""),
        $("#photo").val(""),
        $("#q1").val(""),
        $("#q2").val(""),
        $("#q3").val(""),
        $("#q4").val(""),
        $("#q5").val(""),
        $("#q6").val(""),
        $("#q7").val(""),
        $("#q8").val(""),
        $("#q9").val(""),
        $("#q10").val("")
    });

});
