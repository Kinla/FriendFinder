//* A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//* A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
const friends = require("../data/friends.js")

const api = (app) => {
    app.get("/api/friends", function(req, res) {
        res.json(friends)
    });

    app.post("/api/friends", function(req, res) {
        //get friends array's sums as a rray
        let friendsSum = friends.map(el => el.sum)
        console.log(friendsSum)

        // define user sum
        let reqSum = parseInt(req.body.sum)
        console.log(reqSum)

        // calculate diff between user and all friends
        const calcDiff = (val, array) => {
            return array.map(el => Math.abs(val - el))
        }
        
        let diff = calcDiff(reqSum, friendsSum)
        console.log(diff)

        // find the smallest value of the calculated diff
        let minDiff = Math.min(diff)
        console.log(minDiff)

        // find the array key that matches this smallest diff within the diff array
        let keyID = diff.indexOf(minDiff)
        console.log(keyID)

        // return the friend JSONthat also is in this key position
        res.json(friends[keyID])
        console.log(friends[keyID])

        // push current user info onto friends array
        req.body.sum = parseInt(req.body.sum)
        friends.push(req.body)
        console.log(friends)
    });
    


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

module.exports = api