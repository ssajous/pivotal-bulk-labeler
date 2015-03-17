'use strict';

var _ = require('lodash');
var q = require('q');
var Pivotal = require('./pivotal.model');
var PivotalConfig = require('../pivotal-config/pivotal-config.model');
var https = require('https');

function getUserConfig(req) {
  var deferred = q.defer();
  PivotalConfig.findOne({userId: req.user._id}, function (err, config) {
    if (err) { deferred.reject(err); }
    deferred.resolve(config);
  });

  return deferred.promise;
}

exports.getProjects = function(req, res) {
  getUserConfig(req).then(function(config) {
    var options = {
      host : 'www.pivotaltracker.com',
      port : 443,
      path : '/services/v5/projects', // the rest of the url with parameters if needed
      method : 'GET',
      headers: {
        'X-TrackerToken': config.apiToken
      }
    };

    var reqGet = https.request(options, function(res) {
      console.log("statusCode: ", res.statusCode);


      res.on('data', function(d) {
        return res.json(200, d);
      });

    });

    reqGet.end();
    reqGet.on('error', function(e) {
      console.error(e);
    });
  });
}

// Get list of pivotals
exports.index = function(req, res) {
  Pivotal.find(function (err, pivotals) {
    if(err) { return handleError(res, err); }
    return res.json(200, pivotals);
  });
};

// Get a single pivotal
exports.show = function(req, res) {
  Pivotal.findById(req.params.id, function (err, pivotal) {
    if(err) { return handleError(res, err); }
    if(!pivotal) { return res.send(404); }
    return res.json(pivotal);
  });
};

// Creates a new pivotal in the DB.
exports.create = function(req, res) {
  Pivotal.create(req.body, function(err, pivotal) {
    if(err) { return handleError(res, err); }
    return res.json(201, pivotal);
  });
};

// Updates an existing pivotal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pivotal.findById(req.params.id, function (err, pivotal) {
    if (err) { return handleError(res, err); }
    if(!pivotal) { return res.send(404); }
    var updated = _.merge(pivotal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pivotal);
    });
  });
};

// Deletes a pivotal from the DB.
exports.destroy = function(req, res) {
  Pivotal.findById(req.params.id, function (err, pivotal) {
    if(err) { return handleError(res, err); }
    if(!pivotal) { return res.send(404); }
    pivotal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
