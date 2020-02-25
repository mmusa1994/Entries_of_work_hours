//Modul dependencies
const express = require('express');
const router = express.Router();
//Middleware dependencies
const auth = require('../../middleware/auth');
//Controller dependencies
const authController = require('../../controllers/authController');
//Check Validation dependencies
const check = require('../../validation/check');

//ROUTES

//@route GET api/auth, @desc  Auth route
router.get('/', auth, authController.list);
//@route POST api/auth, @desc  Authenticate user & get token
router.post('/', check.loginValiadion, authController.login);

module.exports = router;
