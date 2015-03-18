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

function getBaseOptions(url, apiToken, method) {
  var options = {
    host : 'www.pivotaltracker.com',
    port : 443,
    path : url,
    method : method || 'GET',
    headers: {
      'X-TrackerToken': apiToken
    }
  };

  return options;
}
exports.getLabels = function(req, res) {
  getUserConfig(req).then(function(config) {
    var buffers = [];
    var options = getBaseOptions('/services/v5/projects/' + req.params.projectId + '/labels',
      config.apiToken);

    var reqGet = https.request(options, function(resp) {
      resp.on('data', function(d) {
        buffers.push(d);
      });

      resp.on('end', function() {
        return res.json(200, JSON.parse(Buffer.concat(buffers)));
      });
    });

    reqGet.end();
    reqGet.on('error', function(e) {
      console.error(e);
    });
  });
};

exports.deleteStoryLabel = function(req, res) {
  getUserConfig(req).then(function(config) {
    var url = '/services/v5/projects/' + req.params.projectId + '/stories/' +
        req.params.storyId + '/labels/' + req.params.labelId;
    var options = getBaseOptions(url, config.apiToken, 'DELETE');

    var reqDelete = https.request(options, function(resp) {
      return resp.statusCode();
    });

    reqDelete.end();
    reqDelete.on('error', function(e) {
      console.error(e);
    });
  });
};

exports.getProjects = function(req, res) {
  getUserConfig(req).then(function(config) {
    var options = getBaseOptions('/services/v5/projects', config.apiToken);

    var reqGet = https.request(options, function(resp) {
      resp.on('data', function(d) {
        return res.json(200, JSON.parse(d));
      });

    });

    reqGet.end();
    reqGet.on('error', function(e) {
      console.error(e);
    });
  });
};

exports.getStories = function(req, res) {
  getUserConfig(req).then(function(config) {
    var queryIndex = req.url.indexOf("?");
    var query = "";
    if (queryIndex >= 0) {
      query = req.url.substring(queryIndex);
    }
    var options = getBaseOptions('/services/v5/projects/' + req.params.projectId + '/stories' + query,
      config.apiToken);

    var reqGet = https.request(options, function(resp) {
      console.log("statusCode: ", resp.statusCode);
      var buffers = [];

      resp.on('data', function(d) {
        buffers.push(d);
      });

      resp.on('end', function(d) {
        var buf = Buffer.concat(buffers);
        return res.json(200, JSON.parse(buf));
      });

    });

    reqGet.end();
    reqGet.on('error', function(e) {
      console.error(e);
    });

  });
};

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
