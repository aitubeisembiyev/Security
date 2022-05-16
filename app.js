//level 2.1
require('dotenv').config();
//

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//level 2
const encrypt = require("mongoose-encryption");
//

const app = express();

//always use bodyparser before defining routes!!!
app.use(bodyParser.urlencoded({extended: true}));

const UserRoute = require('./routes/UserRoute')
app.use('/',UserRoute)

app.set('view engine', 'ejs')
app.use(express.static('public'))

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


let port = process.env.PORT||3000;

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});