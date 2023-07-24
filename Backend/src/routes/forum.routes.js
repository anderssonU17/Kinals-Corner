'use strict'

const {Router} = require('express');
const {check} = require('express-validator');

const {validateParams} = require('../middlewares/validate-params');
const { createForum, getForum, addCommentToPost, addLikeToForumPost } = require('../controller/forum.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const api = Router();

api.post('/create-forum',createForum);
api.get('/read-forum', getForum);
api.put('/add-comments/:id', addCommentToPost);
api.put('/update-Forum',[
    validateJWT
], addLikeToForumPost);


module.exports = api;