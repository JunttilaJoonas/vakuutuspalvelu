const express = require('express');
const router = express.Router();
const profiledbservice = require('../services/profileAdminDBservice');
const applicationDBservice = require('../services/applicationDBservice');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/User');

//ROOUTE /application

router.get('/id', (req, res) => {
    applicationDBservice.findOneById(req, res)
})

router.post('/create', (req, res) => {
    applicationDBservice.createOne(req, res)
})

router.get('/all', (req, res) => {
    applicationDBservice.findAll(req, res)
})


module.exports = router;
