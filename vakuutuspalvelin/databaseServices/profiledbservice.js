const express = require('express');
const Profile = require('../models/profile');

function findAll() {
    //findAllProfile
}

function findOneById(req, res, next) {
    let email = req.user.email
    console.log(email)
    Profile.findOne({email: email})
        .populate("profilesinsurances")
        .then(profile => res.json(profile));
}

function updateOneById(req, res) {

}

function deleteOneById(req, res) {

}

function AddInsuranceToACustomer(req, res) {
    /* The following should happen: 1) Insurance is created and added to the database. 2) InsuranceID
    is then set into the profile.*/

    Profile.findByIdandUpdate({_id: req.body.id}, req.body, (err, profile) => {
        res.send("Profile updated")
    });
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

module.exports = {AddProfile, findAll, updateOneById, deleteOneById, findOneById, AddInsuranceToACustomer}
