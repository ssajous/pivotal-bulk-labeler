'use strict';

var _ = require('lodash');
var PivotalConfig = require('./pivotal-config.model');

// Get list of pivotal-configs
exports.index = function(req, res) {
  PivotalConfig.find(function (err, pivotal-configs) {
    if(err) { return handleError(res, err); }
    return res.json(200, pivotal-configs);
  });
};

// Get a single pivotal-config
exports.show = function(req, res) {
  PivotalConfig.findById(req.params.id, function (err, pivotal-config) {
    if(err) { return handleError(res, err); }
    if(!pivotal-config) { return res.send(404); }
    return res.json(pivotal-config);
  });
};

// Creates a new pivotal-config in the DB.
exports.create = function(req, res) {
  PivotalConfig.create(req.body, function(err, pivotal-config) {
    if(err) { return handleError(res, err); }
    return res.json(201, pivotal-config);
  });
};

// Updates an existing pivotal-config in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PivotalConfig.findById(req.params.id, function (err, pivotal-config) {
    if (err) { return handleError(res, err); }
    if(!pivotal-config) { return res.send(404); }
    var updated = _.merge(pivotal-config, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pivotal-config);
    });
  });
};

// Deletes a pivotal-config from the DB.
exports.destroy = function(req, res) {
  PivotalConfig.findById(req.params.id, function (err, pivotal-config) {
    if(err) { return handleError(res, err); }
    if(!pivotal-config) { return res.send(404); }
    pivotal-config.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}