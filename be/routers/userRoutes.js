const express = require("express");
const route = express.Router()

const { Signup, login } = require('../controller/authControl')
const { jwtverify, boss } = require('../controller/jwtverifyControl')

route.post('/signup', Signup)
route.post('/login', login)
route.get('/user', jwtverify, boss)


module.exports = route