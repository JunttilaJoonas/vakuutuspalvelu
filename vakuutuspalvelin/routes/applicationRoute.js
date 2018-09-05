const express = require('express');
const router = express.Router();
const profiledbservice = require('../databaseServices/profiledbservice');
const applicationDBservice = require('../databaseServices/applicationDBservice');
const insuranceDBService = require('../databaseServices/insurancedbservice');
const InsuranceClaimService = require('../databaseServices/InsuranceClaimService')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/User');

//ROOUTE /application

router.get('/id', (req, res) => {
    applicationDBservice.findOneById(req, res)
});

router.get('/customer/:id', (req, res) => {
    let id = req.params.id;
    applicationDBservice.findByCustomerId(id)
        .then(applications => {
            res.status(200);
            res.json(applications);
        })
});

router.post('/create', (req, res) => {
    applicationDBservice.createOne(req, res)
});

router.post('/createinsuranceclaims', (req, res) => {
    InsuranceClaimService.createClaim(req, res)
});


router.post('/save', (req, res) => {
    let id = req.body.id;
    insuranceDBService.addOne(req.body)
        .then(applicationDBservice.deleteOneById(id, req, res)).then
    (data => {
        res.json(data)
    })
});

router.get('/all', (req, res) => {
    applicationDBservice.findAll(req, res)
});


module.exports = router;
