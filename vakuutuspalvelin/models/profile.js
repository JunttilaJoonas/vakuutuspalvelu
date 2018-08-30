var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    address: {
        type: String,
        required: [true] 
    },
    city: {
        type: String,
        required: [true]
    },
    phone: {
        type: String,
        required: [true]
    },
    profilesinsurances: [{
        type: Schema.Types.ObjectId,
        ref: 'insurances'
    }]}
, {collection: 'profiles'});

const Profile = mongoose.model('profiles', ProfileSchema);


module.exports = Profile;