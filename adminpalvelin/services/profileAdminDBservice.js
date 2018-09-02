const express = require('express');
const Profile = require('../models/Profile');
const InsuranceClaim = require('../models/InsuranceClaim');
const applicationDBservice = require ('../services/applicationDBservice')

//FINDS ALL PROFILES

function findAll(req, res) {
    Profile.find({})
        .then(profiles => res.json(profiles))
}

function findByEmail(req, res) {
    let email = req.body.email;
    console.log(email);
    Profile.findOne({email: email})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .then(profile => res.json(profile));
}

function updateCustomerClaims(customerId, data) {
    let id = customerId;
    Profile.findOne({_id: id})
    .populate("profilesinsurances")
    .populate("profileclaims")
    .then(profile => Profile.update({_id: profile._id}, {$push: {"profileclaims": data}}))

}

function updateProfileInsurances(data, customerId, applicationId) {
    let id = customerId;
    console.log(applicationId);
    console.log("CUSTOMERID"+ customerId);
    console.log("DATA" + data);
    Profile.findOne({_id: id})
    .populate("profilesinsurances")
    .populate("profileclaims")
    .then(profile => Profile.updateOne({_id: id}, {$push: {"profilesinsurances": data}})).then(
        promise => {applicationDBservice.deleteOneById(applicationId)}
    )
}

function sendCustomerAMessage(req, res) {
    console.log(req.body);
    const message= {
        "id" : req.body.id,
        "Message" : req.body.Message,
        "Sender" : req.body.Sender,
        "messageId": req.body.messageId
    };
    Profile.update({_id: req.body.id}, {$push: {"profilemessages" : message}}).then(profile => {
        res.json(profile)
    })
}


// FINDS PROFILE BY ID

function findOneById(req, res, next) {
    console.log(req.params);
    console.log('Hello Hallo');
    Profile.findOne({_id: req.params.id})
        .populate("profilesinsurances")
        .populate("profileclaims")
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
    console.log("ollaanko delete profilessa?")
    Profile.deleteOne({_id: req.params.id}, (err, profile) => {
        res.send('Profile deleted')
    })
}

// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {sendCustomerAMessage, updateProfileInsurances, updateCustomerClaims, deleteProfile, findByEmail, AddProfile, findAll, updateCustomerById, updateOneById, deleteOneById, findOneById, AddInsuranceToACustomer}
