//level 2.1
//require('dotenv').config();
//

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//level 5
const session = require('express-session')
const passport=require('passport')
//
//level 4
//const bcrypt = require('bcrypt');
//
//level 3
//const md5 = require('md5');
//
//level 2
//const encrypt = require("mongoose-encryption");
//

const app = express();

//always use bodyparser before defining routes!!!
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.use(express.static('public'))
//level 5 put these lines of codes above almost everything!!!
app.use(session({
    secret: "then we need to replace it to .env file",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
//

const UserRoute = require('./routes/UserRoute')
app.use('/',UserRoute)

const dbConfig = require('./config/database.config.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});



app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

//level 5
app.get("/secrets", function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets")
    }else{
        res.redirect("/login")
    }
});

app.get("/logout",function (req, res){
    req.logout()
    res.redirect("/")
})
//

let port = process.env.PORT||3000;

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});