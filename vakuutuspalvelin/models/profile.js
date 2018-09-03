const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
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
        }],
        profileclaims: [{
            type: Schema.Types.ObjectId,
            ref: 'insuranceclaims'
        }],
        profilesinvoices: [{
            type: Schema.Types.ObjectId,
            ref: 'invoices'
        }]
    }
    , {collection: 'profiles'});

const Profile = mongoose.model('profiles', ProfileSchema);


module.exports = Profile;