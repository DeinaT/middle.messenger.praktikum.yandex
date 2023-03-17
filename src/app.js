var express = require("express");
var path = require('path');

var app = express();

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(3000);
