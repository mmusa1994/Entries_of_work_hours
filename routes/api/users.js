//Moduls dependencies
const express = require('express');
const router = express.Router();
//Controllers dependencies
const usersController = require('../../controllers/usersController');
//Check Validation dependencies
const check = require('../../validation/check');

//ROUTE

//@route POST api/users, @desc  Register use
router.post('/', check.registerValidation, usersController.register);

module.exports = router;
