//Moduls dependencies
const express = require('express');
const router = express.Router();
//Middleware dependencies
const auth = require('../../middleware/auth.js');
//Controller dependencies
const workDayController = require('../../controllers/workDayController');
//Check Validation dependencies
const check = require('../../validation/check');

//ROUTES

//@route GET api/workday/
router.get('/', auth, workDayController.workDaysList);

//@route GET api/workday/table
router.get('/table', auth, workDayController.workDaysListOfUser);

//@route POST api/workday/input
router.post(
  '/input',
  auth,
  check.workDayValidation,
  workDayController.newWorkDay
);

//@route GET api/workday/edit/:id
router.get('/edit/:id', auth, workDayController.editWorkDay);

//@route PUT api/workday/:id
router.put('/:id', auth, workDayController.updateWorkDay);

// @route DELETE api/workday/:id
router.delete('/:id', auth, workDayController.deleteWorkDay);

module.exports = router;
