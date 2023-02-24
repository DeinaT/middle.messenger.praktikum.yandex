const express = require("express");

const app = express();

app.set("view engine", "hbs");
app.set("views", "src");

app.use("/", express.static(__dirname + "/../dist"))
app.use("/information/", express.static(__dirname + "/../dist/up_/information"))
app.use("/registration/", express.static(__dirname + "/../dist/up_/registration"))
app.use("/authorization/", express.static(__dirname + "/../dist/up_/authorization"))
app.use("/chat/", express.static(__dirname + "/../dist/up_/chat"))
app.use("/changes/data", express.static(__dirname + "/../dist/up_/changes/data"))
app.use("/changes/password", express.static(__dirname + "/../dist/up_/changes/password"))
app.use("/error/404", express.static(__dirname + "/../dist/up_/errors/err_404"))
app.use("/error/500", express.static(__dirname + "/../dist/up_/errors/err_500"))

app.listen(3000);
