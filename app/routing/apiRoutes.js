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
        let userSum = parseInt(req.body.sum)
        console.log(userSum)

        // calculate diff between user and all friends
        const calcDiff = (val, array) => {
            return array.map(el => Math.abs(val - el))
        }
        
        let diff = calcDiff(userSum, friendsSum)
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

module.exports = api