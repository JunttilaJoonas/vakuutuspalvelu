const express = require('express');
const InsuranceApplication = require('../models/InsuranceApplication');


function findOneById(req, res, next) {
    let id = req.params.id
    console.log("ID: " + id);
    InsuranceApplication.findOne({_id: id})
        .then(application => res.json(application));
}

function createOne(req, res) {
    console.log(req.body)
    InsuranceApplication.create(req.body)
        .then((application) => {res.json(application)})
}

function findAll(req, res, next) {
    InsuranceApplication.find({})
        .then(applications => res.json(applications));
}

function deleteOneById(id, req, res) {
    console.log("ID" + id);
    InsuranceApplication.deleteOne({_id: id}, function(err, insurance) {
       console.log("We are done!")
      }).catch(next);
}


// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {createOne, findOneById, deleteOneById, findAll}
