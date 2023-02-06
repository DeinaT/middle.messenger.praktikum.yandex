//import image from './image/back_image.png'

const express = require("express");

const app = express();

app.set("view engine", "hbs");
app.set("views", "src");

//var fs = require('fs');
//var files = fs.readdirSync(__dirname);
//app.use(express.static(__dirname))
//app.use("/css", express.static(__dirname + "/sass"))
app.use("/image", express.static(__dirname + "/image"))

app.use("/contact", function(_, response){

    response.render("test.hbs");
});

app.use("/", function(_, response){
    /*response.render("test.hbs", {
        title: "Мои контакты",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        phone: "+1234567890"
    });*/
    response.render("test.hbs", {
        image: "/image/back_image.png"
    });
});


app.listen(3000);