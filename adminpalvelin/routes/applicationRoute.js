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
   console.log(req.params.id)
    applicationDBservice.findOneById(req, res)
})

router.post('/create', (req, res) => {
    applicationDBservice.createOne(req, res)
})

/* THIS IS NOT SUPPOSED TO BE IN THE CUSTOMER BACKEND. I KEPT IT FOR SAFETY. WILL BE REMOVED LATER/KPU
router.post('/save', (req, res) => {
    let id = req.body.id
    console.log(id);
    insuranceDBService.addOne(req.body)
    .then(applicationDBservice.deleteOneById(id, req, res)).then
    (data => {res.json(data)})
})*/

router.get('/all', (req, res) => {
    applicationDBservice.findAll(req, res)
})


module.exports = router;
