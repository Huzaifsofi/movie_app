const express = require("express");
const route = express.Router()
const multer = require('multer')
const path = require('path')
const { createMovie, getmovies, getmoviesById } = require('../controller/adminControl')
const { jwtverify, isAdmin } = require('../controller/jwtverifyControl')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage: storage })

route.post('/create', upload.single('photo') ,createMovie)
route.get('/getmovie', getmovies)
route.get('/getmovie/:id', getmoviesById)
route.get('/admin', jwtverify, isAdmin)


module.exports = route