//2. Your `server.js` file should require the basic npm packages we've used in class: `express` and `path`.
const express = require("express");
const path = require("path")

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes.js")
require("./app/routing/htmlRoutes.js")


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

