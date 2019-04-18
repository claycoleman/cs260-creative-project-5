const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('./auth.js');

const users = require('./users.js');
const User = users.model;

const patient = require('./patients.js');
const Patient = patient.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
  },
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

// routes

// get comments for patient
router.get('/:patientId', async (req, res) => {
  // return patient
  try {
    let patient = await Patient.findOne({
      _id: req.params.patientId,
    });
    let comments = await Comment.find({
      patient: patient,
    })
      .sort({
        date: -1,
      })
      .populate('user');

    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// add a comment for a patient
router.post('/:patientId', auth.verifyToken, User.verify, async (req, res) => {
  // check parameters

  let patient = null;
  try {
    patient = await Patient.findOne({
      _id: req.params.patientId,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  if (patient == null) {
    console.log('no patient found for id ' + req.params.patientId);
    return res.sendStatus(500);
  }

  const newComment = new Comment({
    user: req.user,
    patient: patient,
    body: req.body.body,
  });

  try {
    await newComment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
};
