const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsuranceClaimSchema = new Schema({
    text: {
        type: String,
        required: [true]
    },
    userid: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },

}, {collection: 'insuranceclaims'});


const InsuranceClaim = mongoose.model('insuranceclaims', InsuranceClaimSchema);


module.exports = InsuranceClaim;