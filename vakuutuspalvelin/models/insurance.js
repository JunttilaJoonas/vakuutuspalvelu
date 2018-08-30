const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
    insurancetype: {
        type: String,
        required: [true]
    },
    userid: {
      type: String,
      required: [true]
    },
    valid: {
        type: String,
        required: [true]
    },
    nextPaymentDate: {
        type: String,
        required: [true]
    },
    expires: {
        type: String
    },
    priceperyear: {
        type: Number
    },
    deductible: {
        type: Number
    }, 
    objectOfInsurance: {
        type: Object
    },
    notification: {
        type: Object
    }
}, {collection: 'insurances'});



const Insurance = mongoose.model('insurances', InsuranceSchema);


module.exports = Insurance;