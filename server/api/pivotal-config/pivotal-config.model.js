'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PivotalConfigSchema = new Schema({
  apiToken: String,
  projectId: String
});

module.exports = mongoose.model('PivotalConfig', PivotalConfigSchema);
