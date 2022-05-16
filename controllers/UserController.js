const UserModel = require('../models/UserModel')

exports.register = async (req, res) => {
    console.log(req.body.username)
    const newUser =  new UserModel({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if (err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    });
};

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findOne({email: username}, function(err, foundUser){
        if (err) {
            res.send("404")
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                }
            }
        }
    });
};