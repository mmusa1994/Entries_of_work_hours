//Models dependencies
const User = require('../models/User');
const WorkDay = require('../models/WorkDay');
const { validationResult } = require('express-validator');

exports.workDaysList = async (req, res) => {
  try {
    const workday = await WorkDay.find().populate('user', ['name', 'avatar']);
    res.json(workday);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// With PAGINATION

/* exports.workDaysListOfUser = async (req, res) => {
  try {
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 10;

    const page = req.query.page ? parseInt(req.query.page) : 1;

    const workday = await WorkDay.find({ user: req.user.id })
      .skip((page - 1) * pagination)
      .limit(pagination)
      .populate('user', ['name', 'avatar']);
    res.json(
      workday.sort(function(a, b) {
        return a.day - b.day;
      })
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};*/

exports.workDaysListOfUser = async (req, res) => {
  try {
    const workday = await WorkDay.find({ user: req.user.id }).populate('user', [
      'name',
      'avatar'
    ]);
    res.json(
      workday.sort(function(a, b) {
        return a.day - b.day;
      })
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.newWorkDay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newWorkDay = new WorkDay({
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
      day: req.body.day,
      from: req.body.from,
      to: req.body.to,
      description: req.body.description
    });

    const workday = await newWorkDay.save();

    res.json(workday);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.editWorkDay = async (req, res) => {
  try {
    const workday = await WorkDay.findById(req.params.id).populate('user', [
      'name',
      'avatar'
    ]);

    // Check user
    if (workday.user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    res.json(workday);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.updateWorkDay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const workday = await WorkDay.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }).populate('user', ['name', 'avatar']);

    res.json({ workday, msg: 'Day updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteWorkDay = async (req, res) => {
  try {
    const workday = await WorkDay.findById(req.params.id);

    // Check user
    if (workday.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await workday.remove();

    res.json({ workday, msg: 'Day removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
