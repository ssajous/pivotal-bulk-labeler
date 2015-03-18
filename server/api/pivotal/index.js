'use strict';

var express = require('express');
var controller = require('./pivotal.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/projects', auth.isAuthenticated(), controller.getProjects);
router.get('/projects/:projectId/stories', auth.isAuthenticated(), controller.getStories);
router.get('/projects/:projectId/labels', auth.isAuthenticated(), controller.getLabels);

router.delete('/projects/:projectId/stories/:storyId/label/:labelId', auth.isAuthenticated(),
  controller.deleteStoryLabel);

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);


module.exports = router;
