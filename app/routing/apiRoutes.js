const friends = require("../data/friends.js")

const api = (app) => {
    app.get("/api/friends", function(req, res) {
        res.json(friends)
    });

    app.post("/api/friends", function(req, res) {
        //get friends array's sums as array
        let friendsAns = friends.map(el => el.answers)
        console.log(friendsAns)

        // define user answers
        let userAns = req.body.answers
        console.log(userAns)

        // calculate diff between user and all friends
        let diffs = calcDiff(friendsAns, userAns)
        console.log(diffs)
        
        // find the smallest value of the calculated diff
        let minDiff = Math.min(...diffs)
        console.log(minDiff)

        // find all array key(s) that matches this smallest diff within the diff array
        let matches = findMatch(diffs, minDiff)
        console.log(matches)

        // Chose match by random
        // (useful if more than one match... else only the first one would always get a friend)
        let random = Math.floor(Math.random()*matches.length)
        let keyID = matches[random]
        console.log(random, keyID)

        // return the friend that is in this key position
        res.json(friends[keyID])
        console.log(friends[keyID])

        // push current user info onto friends array
        req.body.answers = req.body.answers.map(el => parseInt(el))
        friends.push(req.body)
        console.log(friends)
    });
}


// Calculating diff
const calcDiff = (friendsAns, userAns) => {
    let diffs = []
    for (var i = 0; i < friendsAns.length; i++){
        let diff = 0
        for(var j = 0; j < userAns.length; j++){
            diff += Math.abs(parseInt(friendsAns[i][j]) - parseInt(userAns[j]))
        }
        diffs.push(diff)
    }
    return diffs

}

// Finding match
const findMatch = (diffs, minDiff) => {
    let matches = []
    for (var i = 0; i < diffs.length; i++){
        if (diffs[i] === minDiff){
            matches.push(i)
        }
    }
    return matches
}

module.exports = api