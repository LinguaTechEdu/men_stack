var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

/**
 * User Methods & Authentication
 *
 * Bcrypt is an encryption library. It's used here to secure passwords.
 * This is done in two steps:
 *
 * 1. Hash: Encrypt the plain password into a cipher
 * 2. Salt: An additional secure string used to 'unlock' the cipher
 *
 * REMEMBER: PASSWORDS ARE NEVER STORED.
 *
 * They are scrambled into a long, random string. Then when a user
 * logs in, that string is checked by:
 *
 * 1. Encrypting it using the salt.
 * 2. Checking that the new cipher matches the old.
 *
 */

UserSchema.methods.generateHash = function(password) {
    // Hash the password and salt it.
    // It will never been seen again nor stored in the database.
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Authenticate the user
UserSchema.methods.validPassword = function(password) {
    // Hash the submitted password, add the salt.
    // If it matches the hash in the database, then its valid.
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
