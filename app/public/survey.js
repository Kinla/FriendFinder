//Scroll to top on refresh/closing modal (closing modal needs to be added still)
//dont know why but this is gittery???
$(document).ready(function(){
    $(this).scrollTop(0);
});

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
    
    // Create two additional properties for surveyResults if isValid
    if (isValid){
        // Populate surveyResults.answers
        surveyResults.answers = []
        for (var i = 1; i < 11; i++){
            surveyResults.answers.push(parseInt($("#q"+ i).val().trim()))
        }
    
        // Calculate sum of results
        surveyResults.sum = surveyResults.answers.reduce((a,b) => a + b, 0)

    }

    console.log(surveyResults)
    
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
        alert("Please complete every filed of the form.")//should write a modal for this
    }


});
