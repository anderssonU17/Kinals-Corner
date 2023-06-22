'use strict'

const {Router} = require('express');
const {check} = require('express-validator');

const {validateParams} = require('../middlewares/validate-params');
const { createForum, getForum, addCommentToPost, updateForumPostLikes } = require('../controller/forum.controller');

const api = Router();

api.post('/create-forum', createForum);
api.get('/read-forum', getForum);
api.get('/add-comments', addCommentToPost);
api.put('/update-Forum', updateForumPostLikes);


module.exports = api;