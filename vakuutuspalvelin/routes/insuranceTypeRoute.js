const express = require('express');
const router = express.Router();
const generalinformationdbservice = require('../databaseServices/generalInformationDBService');
const passport = require('passport');

router.get('/insurancetypes', function(req, res, next) {
  generalinformationdbservice.findAll(req, res);
});

router.post('/insurancetypes', (req, res, next) => {
  generalinformationdbservice.addInsuranceType(req, res);
});

router.get('/test', passport.authenticate('jwt',
{session: false}), (req, res) => 
{res.send(req.user.email)})

module.exports = router;
