//* A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//* A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
const express = require("express");
const app = express();
const friends = require("../data/friends.js")


app.get("/api/friends", function(req, res) {
    return res.json(friends)
});

app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
    console.log(newFriend);

    bestFriend(newFriend);

    friends.push(newFriend);
});

const bestFriend = (me) => {
    let score = me.score;
    let allScores = [friends].maps(el => el.scores);
    let sumScores = allScores.map(el = )
    
    
}
    /*
    6. Determine the user's most compatible friend using the following as a guide:
    
    * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
    * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
        * Example:
        * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
        * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
        * Total Difference: **2 + 1 + 2 =** **_5_**
    * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
    * The closest match will be the user with the least amount of difference.
    */

