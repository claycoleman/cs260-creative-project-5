const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const organizationSchema = new mongoose.Schema({
  name: String,
});

organizationSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return obj;
}

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = {
  model: Organization,
  routes: router,
}
