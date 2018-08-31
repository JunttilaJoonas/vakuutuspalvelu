const express = require('express');
const InsuranceClaim = require('../models/InsuranceClaim');
const profileAdminDBservice = require('../services/profileAdminDBservice')



function createClaim(req, res) {
    let customerId = req.body.userid;
    console.log(req.body);
    InsuranceClaim.create(req.body)
        .then((document) =>
        profileAdminDBservice.updateCustomerClaims(document.userid, document._id));
}

function findById(req, res) {
    console.log("REQ BODY" + req.body._id);
    InsuranceClaim.find({userid: req.body._id})
        .then(insurances => res.json(insurances))
}

// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {createClaim, findById}
