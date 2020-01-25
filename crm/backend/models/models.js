const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    contact: {type: Number, required: true, unique: true},
    worksat: {type: String, required: true},
    designation: {type: String, required: true},
    companyspace: {type: String, default: '***'},
    empspace: {type: String, default: '***'}

});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User',userSchema);

const layoutSchema = mongoose.Schema({
    creator: {type: String, required: true},
    layout: {type: mongoose.Schema.Types.Mixed ,required: true},
    foryear: {type: String, default: new Date().toLocaleDateString()},
    cspace: {type: String, required: true}
})

const LayoutSchema = mongoose.model('LayoutSchema', layoutSchema)

module.exports = {User: User, LayoutSchema: LayoutSchema}