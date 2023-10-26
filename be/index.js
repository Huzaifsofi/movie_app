const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const userRoutes = require('./routers/userRoutes')
const adminRoutes = require('./routers/adminRoute')
const postRoutes = require('./routers/postRoute')

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/post', postRoutes)

app.use('/', express.static('./uploads'));


app.listen(8000, () => {
    console.log('running at 5000')
})

mongoose.connect(
    'mongodb+srv://huzaif:huzaifmtb@cluster0.tkpiyzu.mongodb.net/Cluster0?retryWrites=true&w=majority'
).then(() => console.log('connnected'))
.catch((err) => console.log(err))