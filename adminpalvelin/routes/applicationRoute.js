const express = require('express');
const router = express.Router();
const profiledbservice = require('../services/profileAdminDBservice');
const applicationDBservice = require('../services/applicationDBservice');
const insuranceDBService = require('../services/insuranceAdminDBservice')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/User');

//ROOUTE /application

router.get('/id/:id', (req, res) => {
    applicationDBservice.findOneById(req, res)
})

router.post('/create', (req, res) => {
    applicationDBservice.createOne(req, res)
})

router.post('/save', (req, res) => {
    let id = req.body.applicationid
    console.log(id);
    insuranceDBService.createInsuranceAndUpdateCustomer(req, res, id)
    .then((res) => {console.log("woie")})
    
})

router.get('/all', (req, res) => {
    applicationDBservice.findAll(req, res)
})


module.exports = router;
