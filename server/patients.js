const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('./auth.js');

// Configure multer so that it will upload to '/public/images'
const multer = require('multer');
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000,
  },
});

const users = require('./users.js');
const User = users.model;

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
  },
  name: String,
  birthDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
});

const Patient = mongoose.model('Patient', patientSchema);

// routes

// upload patient
router.post('/', auth.verifyToken, User.verify, async (req, res) => {
  // check parameters

  const patient = new Patient({
    user: req.user,
    organization: req.user.organization,
    name: req.body.name,
    birthDate: req.body.birthDate,
    dueDate: req.body.dueDate,
  });

  try {
    await patient.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my patients
router.get('/', auth.verifyToken, User.verify, async (req, res) => {
  // return patients
  try {
    let patients = await Patient.find({
      user: req.user,
    }).sort({
      created: -1,
    });
    return res.send(patients);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all patients
router.get('/all', async (req, res) => {
  try {
    let patients = await Patient.find()
      .sort({
        created: -1,
      })
      .populate({
        path: 'user',
        populate: {
          path: 'organization',
        },
      });
    return res.send(patients);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get patient by id
router.get('/:patientId', async (req, res) => {
  // return patients
  try {
    let patient = await Patient.findOne({
      _id: req.params.patientId,
    }).populate({
      path: 'user',
      populate: {
        path: 'organization',
      },
    });
    return res.send(patient);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Patient,
  routes: router,
};
