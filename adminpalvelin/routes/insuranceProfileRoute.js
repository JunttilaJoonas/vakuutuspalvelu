const express = require('express');
const router = express.Router();
const profiledbservice = require('../services/profileAdminDBservice');
const insuranceDBservice = require('../services/insuranceAdminDBservice');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/User');

router.get('/all', (req, res) => {
    profiledbservice.findAll(req, res)
})

//@Route /current
//GET this shows the current profile information
//Private
//TODO THIS WILL CHANGE WHEN AUTHENTICATION IS ADDED

router.get('/customer/:id', (req, res) => {
    profiledbservice.findOneById(req, res)
});

router.delete('/customer/:id', (req, res) => {
        console.log("are we where?")
      profiledbservice.deleteProfile(req, res)
  });

//@Route /omavakuutus/:vakuutusID
//GET this shows the information of one information
//Private

router.post('/message', (req, res, next) => {
    profiledbservice.sendCustomerAMessage(req, res);
})

router.post('/createProfile', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
  
                return res.status(400);
            } else {
      
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                    
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then( user => res.json(user))
                            .catch(err => console.log(err));
                        })
                } 
            )
    })
});


module.exports = router;
