var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var adminSchema = new Schema({
    email: String,
    password: String
});

/**
 * Pre-Save Hook
 * http://mongoosejs.com/docs/api.html#schema_Schema-pre
 */

adminSchema.pre("save", function(next) {
        if (this.isModified('password'))
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    next();
});

adminSchema.method('authenticate', function(password) {
    return bcrypt.compareSync(password, this.password);
});

var adminModel = mongoose.model('Admins', adminSchema);

module.exports = adminModel;