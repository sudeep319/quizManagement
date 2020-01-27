import mongoose from 'mongoose';
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

var Schema = mongoose.Schema({
    user_name: String,
    salt: String,
    hash: String,    
    role: String
});


    Schema.methods.setPassword = function(password) {

        // creating a unique salt for a particular user
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    };
    
    Schema.methods.validPassword = function(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
        return this.hash === hash;
    };
        
    Schema.methods.generateJwt = function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
    
        return jwt.sign({
            _id: this._id,
            user_name: this.user_name,
            role: this.role,
            exp: parseInt(expiry.getTime() / 1000),
        }, 'llp');
    };

export default mongoose.model('Test', Schema);
