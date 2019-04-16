//init chosen
$(".chosen-select").chosen({disable_search_threshold: 10})

// In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
// In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

$("#submit").on("click", (event) => {
    event.preventDefault();

    // Here we grab the form elements
    let surveyResults = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        q1: parseInt($("#q1").val().trim()),
        q2: parseInt($("#q2").val().trim()),
        q3: parseInt($("#q3").val().trim()),
        q4: parseInt($("#q4").val().trim()),
        q5: parseInt($("#q5").val().trim()),
        q6: parseInt($("#q6").val().trim()),
        q7: parseInt($("#q7").val().trim()),
        q8: parseInt($("#q8").val().trim()),
        q9: parseInt($("#q9").val().trim()),
        q10: parseInt($("#q10").val().trim())
    };
        
    // Calculate sum of results
    surveyResults.sum = surveyResults.q1 + surveyResults.q2 + surveyResults.q3 + surveyResults.q4 + surveyResults.q5 + surveyResults.q6 + surveyResults.q7 + surveyResults.q8 + surveyResults.q9 + surveyResults.q10

    // Validation
    let isValid = true

    if (!surveyResults.name) {
        isValid = false
    }
    
    const imgExists = (url) => {
        let img = new Image();
        img.url = url
        img.onerror = () => {isValid = false}
    }

    imgExists(surveyResults.photo)

    for (var i = 1; i < 11; i++){
        console.log(surveyResults["q" + i])
        if((surveyResults["q" + i]) === NaN){
            isValid = false
        }
    }

    console.log(isValid)

    // Send post
    if (isValid) {
        $.post("/api/friends", surveyResults, function(data){

            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo);

            // Show the modal with the best match
            $("#results-modal").modal("toggle");
    
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

    } else {
        alert("Please complete every filed of the form.")
    }


});
