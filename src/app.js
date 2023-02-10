const express = require("express");

const app = express();

app.set("view engine", "hbs");
app.set("views", "src");

app.use("/", express.static(__dirname + "/../dist"))

app.listen(3000);
