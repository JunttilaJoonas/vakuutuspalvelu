const express = require('express');
const Profile = require('../models/profile');
const InsuranceClaims = require('../models/InsuranceClaim');
const Invoices = require('../models/Invoice');



function findOneById(req, res, next) {
    let email = req.user.email;
    Profile.findOne({email: email})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .populate("profilesinvoices")
        .then(profile => res.json(profile));
}

function updateCustomerClaims(customerId, data) {
    Profile.findOne({_id: customerId})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .populate("profilesinvoices")
        .then(profile => Profile.update({_id: profile._id}, {$push: {"profileclaims": data}}))

}


function AddProfile(req, res) {
    Profile.create(req.body)
        .then(res.send("Profile created"));
}

function deleteProfile(req, res) {
    Profile.deleteOneById({_id: req.body.id}, (err, profile) => {
        res.send('Profile deleted')
    })
}

// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {AddProfile, updateCustomerClaims, findOneById};
