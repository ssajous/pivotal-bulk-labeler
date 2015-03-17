'use strict';

var _ = require('lodash');
var PivotalConfig = require('./pivotal-config.model');

// Get list of pivotal-configs
exports.index = function(req, res) {
  PivotalConfig.find(function (err, pivotalConfigs) {
    if(err) { return handleError(res, err); }
    return res.json(200, pivotalConfigs);
  });
};

// Get a single pivotalConfig
exports.show = function(req, res) {
  PivotalConfig.findById(req.params.id, function (err, pivotalConfig) {
    if(err) { return handleError(res, err); }
    if(!pivotalConfig) { return res.send(404); }
    return res.json(pivotalConfig);
  });
};

// Creates a new pivotalConfig in the DB.
exports.create = function(req, res) {
  PivotalConfig.create(req.body, function(err, pivotalConfig) {
    if(err) { return handleError(res, err); }
    return res.json(201, pivotalConfig);
  });
};

// Updates an existing pivotalConfig in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PivotalConfig.findById(req.params.id, function (err, pivotalConfig) {
    if (err) { return handleError(res, err); }
    if(!pivotalConfig) { return res.send(404); }
    var updated = _.merge(pivotalConfig, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pivotalConfig);
    });
  });
};

// Deletes a pivotalConfig from the DB.
exports.destroy = function(req, res) {
  PivotalConfig.findById(req.params.id, function (err, pivotalConfig) {
    if(err) { return handleError(res, err); }
    if(!pivotalConfig) { return res.send(404); }
    pivotalConfig.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
