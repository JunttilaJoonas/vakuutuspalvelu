const express = require('express');
const Profile = require('../models/profile');

//FINDS ALL PROFILES

function findAll() {
    //findAllProfile
}

// FINDS PROFILE BY ID

function findOneById(req, res, next) {
    let id = req.param._id
    Profile.findOne({id: id})
        .populate("profilesinsurances")
        .then(profile => res.json(profile));
}

//UPDATES A PROFILE BY ID

function updateOneById(req, res) {

}

//DELETES BY ID

function deleteOneById(req, res) {

}

//ADDSS INSURANCE TO THE CUSTOMER

function AddInsuranceToACustomer(req, res) {
    /* The following should happen: 1) Insurance is created and added to the database. 2) InsuranceID
    is then set into the profile.*/

    Profile.findByIdandUpdate({_id: req.body.id}, req.body, (err, profile) => {
        res.send("Profile updated")
    });
}

function updateCustomerById(data) {
    console.log(data);
    return Profile.findByIdAndUpdate({_id: data._id}, data, (err, profile) => {
        console.log("DATA", data);
        console.log('PROFILE', profile);
        return data;
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

module.exports = {AddProfile, findAll, updateCustomerById, updateOneById, deleteOneById, findOneById, AddInsuranceToACustomer}
