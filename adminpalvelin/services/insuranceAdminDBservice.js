const Insurance = require('../models/Insurance');
const profileDBService = require('./profileAdminDBservice');

function findOneById(req, res) {
    Insurance.findById({_id: req.params.id}).then(insurance => res.json(insurance))
}

function findAllByUserID(req, res) {
    Insurance.find({userid: req.params.id})
    .then((insurance) => {res.json(insurance)})
}

function deleteCustomerInsurance(id) {
    console.log(id)
    Insurance.deleteOne({_id: id})
    .then((insurance) => {res.json(insurance)})
}

function findAll() {
    return Insurance.find({}, (err, insurances) => {
        if (err) throw err;
        else return insurances;
    });
}

function addOne(data) {
    console.log(data)
    return Insurance.create(data)
        .then(createdInsurance => {
            console.log(createdInsurance);
        }).catch(error => {
            console.log("VIRHE")
    });
}

function updateOneById(data) {
    return Insurance.findByIdAndUpdate({_id: data._id}, data, (err, insurance) => {
        console.log("DATA", data);
        return data;
    });
}

function createInsuranceAndUpdateCustomer(req, res, id) {
    console.log("are we here?")
    console.log(req.body);
    let applicationId = id;
    Insurance.create(req.body).then(document => {
        profileDBService.updateProfileInsurances(document._id, document.userid, applicationId)})

}

function deleteOneById(id){
    Insurance.deleteOne({_id: id}, (err, result) => {
        console.log("poistettu");
    });
}

module.exports = {findOneById, createInsuranceAndUpdateCustomer, findAllByUserID, deleteCustomerInsurance, findAll, addOne, updateOneById, deleteOneById};

