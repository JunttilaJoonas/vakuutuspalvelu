const express = require('express');
const router = express.Router();
const profiledbservice = require('../services/profileAdminDBservice');
const insuranceDBservice = require('../services/insuranceAdminDBservice');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/User');


//@Route /current
//GET this shows the current profile information
//Private
//TODO THIS WILL CHANGE WHEN AUTHENTICATION IS ADDED

router.get('/:id', passport.authenticate('jwt',
{session: false}), (req, res) => {
    profiledbservice.findOneById(req, res)
  });

//@Route /omavakuutus/:vakuutusID
//GET this shows the information of one information
//Private




router.post('/updatecustomer', (req, res, next) => {
    profiledbservice.updateCustomerById(req.body)
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
            }
        }
    )
})


module.exports = router; 