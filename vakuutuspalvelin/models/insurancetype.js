var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsuranceTypeSchema = new Schema({
    insurancetype: {
        type: String,
        required: [true]
    },
    name: {
        type: String,
        required: [true, 'Osoite on pakollinen!']
    },
    copyBlurb: {
        type: String,
        required: [true]
    },
    conditionsUrl: {
        type: String,
        require: [true]
    }
}, {collection: 'insuranceTypes'});

const InsuranceType = mongoose.model('insurancetypes', InsuranceTypeSchema);


module.exports = InsuranceType; 