const express = require('express');
const InsuranceClaim = require('../models/InsuranceClaim');



function createClaim(req, res) {
    InsuranceClaim.create(req.body)
        .then(res.send("Claim received"));
}


// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {createClaim}
