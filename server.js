//2. Your `server.js` file should require the basic npm packages we've used in class: `express` and `path`.
const express = require("express");
const path = require("path")

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/app/public", "home.html"));
});
  
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + "/app/public", "survey.html"));
});

require("./app/routing/apiRoutes.js")(app)
require("./app/routing/htmlRoutes.js")(app)




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

