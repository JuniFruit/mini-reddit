const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userId: String,
    name: String,
    icon: String,
    token: String, 
    total_karma: Number,    
    
});

UserSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 3600 } )


module.exports = mongoose.model("User", UserSchema);