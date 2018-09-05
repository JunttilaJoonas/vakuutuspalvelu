const express = require('express');
const InsuranceApplication = require('../models/InsuranceApplication');


function findOneById(req, res, next) {
    let id = req.body.id;
    InsuranceApplication.findOne({_id: id})
        .then(application => res.json(application));
}

function createOne(req, res) {
    InsuranceApplication.create(req.body)
        .then((application) => {
            res.json(application)
        })
}

function findByCustomerId(id) {
    return InsuranceApplication.find({userid: id});
}

function findAll(req, res, next) {
    InsuranceApplication.find({})
        .then(applications => res.json(applications));
}

function deleteOneById(id, req, res) {
    InsuranceApplication.deleteOne({_id: id}, function (err, insurance) {
    }).catch(next);
}

module.exports = {createOne, findOneById, deleteOneById, findAll, findByCustomerId};
