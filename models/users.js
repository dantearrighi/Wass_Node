var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: String,
    password: String,
    facebook: {
    }
});

/**
 * Pre-Save Hook
 * http://mongoosejs.com/docs/api.html#schema_Schema-pre
 */

userSchema.pre("save", function (next) {
    if (this.isModified('password'))
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    next();
});

userSchema.method('authenticate', function (password) {
    return bcrypt.compareSync(password, this.password);
});

var userModel = mongoose.model('Users', userSchema);

module.exports = userModel;