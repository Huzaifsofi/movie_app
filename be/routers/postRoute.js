const express = require('express')
const route = express.Router()

const { jwtverify } = require('../controller/jwtverifyControl')
const { createPost, getPosts } = require('../controller/postControl')

route.post('/:id',jwtverify, createPost)
route.get('/', getPosts)

module.exports = route