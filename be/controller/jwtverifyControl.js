const jwt = require('jsonwebtoken');
const { find } = require('../model/postModel');
const User = require('../model/userModel');


const JWT_KEY = 'huzaif123'

const jwtverify = async (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    isLoggedIn: false,
                    message: "Faild to authenticate"
                })
            }
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username;
            next()
        })
    } else {
        return res.json({ message: "Incorrecct token", isLoggedIn: false })
    }
}

const boss = (req, res) => {
    res.json({ isLoggedIn: true, user: req.user.id })
}


const isAdmin = async (req, res) => {
    const user  = req.user.id;

    if (!user) {
        res.json({ message: 'not logged in' })
    }

    const isAdminOrNot = await User.findById(user)

    const admin = isAdminOrNot.role === 'admin'

    if (!admin) {
        return res.json({ message: 'sorry you are not admin' })
    }
    return res.json({ message: 'welcome admin' })
}


exports.jwtverify = jwtverify
exports.boss = boss
exports.isAdmin = isAdmin
