const mongoose = require("mongoose");
//level 2
const encrypt = require("mongoose-encryption");
//
let userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//level 2
//const SECRET = "SuperSecretKey"; //later on we will replace it with env variable
//userSchema.plugin(encrypt, { secret: SECRET, encryptedFields: ["password"] });
//
//level 2.1 - it is better to hide our secret
//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });


let userModel = new mongoose.model("User", userSchema);
module.exports = userModel;