const express = require('express');
const InsuranceClaim = require('../models/InsuranceClaim');



function createClaim(req, res) {
    InsuranceClaim.create(req.body)
        .then(res.send("Claim received"));
}

function findById(req, res) {
    console.log("REQ BODY" + req.body._id);
    InsuranceClaim.find({userid: req.body._id})
        .then(insurances => res.json(insurances))
}

// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {createClaim, findById}
