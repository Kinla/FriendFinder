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
        q1: $("#q1").val().trim(),
        q2: $("#q2").val().trim(),
        q3: $("#q3").val().trim(),
        q4: $("#q4").val().trim(),
        q5: $("#q5").val().trim(),
        q6: $("#q6").val().trim(),
        q7: $("#q7").val().trim(),
        q8: $("#q8").val().trim(),
        q9: $("#q9").val().trim(),
        q10: $("#q10").val().trim(),
    };
    
    // Validation
    let isValid = true
    
    // This checks all form value to not be ""
    let values = Object.values(surveyResults)
    
    for (let i = 0; i < values.length; i++){
        if(!values[i]){
            isValid = false
        }
    }
    // This checs if url leads to actual displayable image --- THIS DOESN'T WORK    
    const imgExists = (url) => {
        let img = new Image();
        img.onerror = () => {isValid = false}
        img.url = url
    }
    
    imgExists(surveyResults.photo)
    
    console.log(isValid)
    
    let userData
    // Create two additional properties for surveyResults if isValid
    if (isValid){
        // Populate surveyResults.answers
        surveyResults.answers = []
        for (var i = 1; i < 11; i++){
            surveyResults.answers.push($("#q"+ i).val().trim())
        }
    
        // Package the data before POSTing
        userData = {
            name: surveyResults.name,
            photo: surveyResults.photo,
            answers: surveyResults.answers
        }
    }

    console.log(userData)

    
    // Send post
    if (isValid) {
        $.post("/api/friends", userData, function(data){

            $(".modal-title").text("Best Match");
            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo).show();

            // Show the modal with the best match
            $("#results-modal").modal("toggle");
    
            // Clear the form when submitting
            $("#name").val(""),
            $("#photo").val(""),
            $("#q1").val("").trigger("chosen:updated"),
            $("#q2").val("").trigger("chosen:updated"),
            $("#q3").val("").trigger("chosen:updated"),
            $("#q4").val("").trigger("chosen:updated"),
            $("#q5").val("").trigger("chosen:updated"),
            $("#q6").val("").trigger("chosen:updated"),
            $("#q7").val("").trigger("chosen:updated"),
            $("#q8").val("").trigger("chosen:updated"),
            $("#q9").val("").trigger("chosen:updated"),
            $("#q10").val("").trigger("chosen:updated")
        });

    } else {
        $(".modal-title").text("Error!");
        $("#match-name").text("Please complete all fields and try again.");
        $("#match-img").hide();

        $("#results-modal").modal("toggle");
    }
});

$(".scroll").on("click", () => {
    $('html,body').animate({ scrollTop: 0 }, 1000);
})

