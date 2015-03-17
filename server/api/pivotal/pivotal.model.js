'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PivotalSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Pivotal', PivotalSchema);