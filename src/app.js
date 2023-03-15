const express = require("express");

const app = express();

app.set("view engine", "hbs");
app.set("views", "src");

app.use(express.static(__dirname + "/../dist"));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/../dist/index.html");
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + "/../dist/index.html");
});
app.listen(3000);
