const express = require('express');
const InsuranceClaim = require('../models/InsuranceClaim');
const profileDBservice = require('../databaseServices/profiledbservice');


function createClaim(req, res) {
    let customerId = req.body.userid;
    InsuranceClaim.create(req.body)
        .then((document) =>
            profileDBservice.updateCustomerClaims(document.userid, document._id));
}

function findById(req, res) {
    InsuranceClaim.find({userid: req.body._id})
        .then(insurances => res.json(insurances))
}

module.exports = {createClaim, findById};
