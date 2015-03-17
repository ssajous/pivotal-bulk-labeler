'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PivotalConfigSchema = new Schema({
  apiToken: String,
  userId: String
});

module.exports = mongoose.model('PivotalConfig', PivotalConfigSchema);
