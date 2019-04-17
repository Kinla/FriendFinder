//* A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//* A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
const friends = require("../data/friends.js")

const api = (app) => {
    app.get("/api/friends", function(req, res) {
        res.json(friends)
    });

    app.post("/api/friends", function(req, res) {
        //get friends array's sums as a rray
        let friendsAns = friends.map(el => el.answers)
        console.log(friendsAns)

        // define user sum
        let userAns = req.body.answers
        console.log(userAns)

        // calculate diff between user and all friends
        let diffs = []
        for (var i = 0; i < friendsAns.length; i++){
            let diff = 0
            for(var j = 0; j < userAns.length; j++){
                diff += Math.abs(parseInt(friendsAns[i][j]) - parseInt(userAns[j]))
            }
            diffs.push(diff)
        }
        console.log(diffs)
        
        // find the smallest value of the calculated diff
        let minDiff = Math.min(...diffs)
        console.log(minDiff)

        // find the array key that matches this smallest diff within the diff array
        let keyID = diffs.indexOf(minDiff)
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