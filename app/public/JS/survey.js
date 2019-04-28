//init chosen
$(".chosen-select").chosen({
    disable_search: true, 
    allow_single_deselect: true, 
    disable_search_threshold: 10, 
    width: "50%"
})

// In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
// In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

$("#form").on("submit", (event) => {
    event.preventDefault();

    // Validation
    let isValid = true
    
    // This checks all form value to not be ""
    if ($(".form-control").val().trim() === "" || $(".chosen-select").val().trim() === ""){
        isValid = false
    }
    
    /*
    // This checks if url leads to actual displayable image
    // THIS DOESN'T WORK - keeping code for easier revisit
    const imgExists = (url) => {
        let img = new Image();
        img.onerror = () => {isValid = false}
        img.url = url
    }    
    imgExists(surveyResults.photo)
    */

    //This validating photo url to be actual url with image file type
    let url = $("#photo").val().trim()
    isValid = checkURL(url)

    console.log(isValid)
    
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
    
    // Package the data before POSTing
    let userData
    if (isValid){
        userData = {
            name: $("#name").val().trim(),
            photo: $("#photo").val().trim(),
            answers: [
                $("#q1").val().trim(),
                $("#q2").val().trim(),
                $("#q3").val().trim(),
                $("#q4").val().trim(),
                $("#q5").val().trim(),
                $("#q6").val().trim(),
                $("#q7").val().trim(),
                $("#q8").val().trim(),
                $("#q9").val().trim(),
                $("#q10").val().trim(),
            ]
        }
    }

    console.log(userData)

    
    // Send post
    if (isValid) {
        $.post("/api/friends", userData, function(data){
            
            // Show the modal with the best match
            $(".modal-title").text("Best Match");
            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo).show();

            $("#results-modal").modal("toggle");
    
            // Clear the form when submitting
            $("#name").val(""),
            $("#photo").val(""),
            $(".chosen-select").val("").trigger("chosen:updated")
        });

    } else {
        // Shows error message
        $(".modal-title").text("Error!");
        $("#match-name").text("Please complete all fields before submitting.");
        $("#match-img").hide();

        $("#results-modal").modal("toggle");
    }
});



// Check URL for image
const checkURL = (url) => {
    if (url.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/) === null){
        return false
    } else {
        return true
    }
}    



// Allow for slowish scroll to top when closing modals
$(".scroll").on("click", () => {
    $('html,body').animate({ scrollTop: 0 }, 1000);
})

