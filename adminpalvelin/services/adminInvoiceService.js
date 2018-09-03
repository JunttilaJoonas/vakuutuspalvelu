const express = require('express');
const Invoice = require('../models/Invoice');
const profileAdminDBservice = require('../services/profileAdminDBservice');



function createInvoice(req, res) {
    console.log("Here?")
    let customerId = req.body.userid;
    console.log(req.body);
    Invoice.create(req.body)
        .then((document) =>
        profileAdminDBservice.updateCustomerInvoices(document.userid, document._id));
}

function findById(req, res) {
    console.log("REQ BODY" + req.body._id);
    Invoice.find({userid: req.body._id})
        .then(insurances => res.json(insurances))
}

// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {createInvoice, findById};
