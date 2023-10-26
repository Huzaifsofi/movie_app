const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js')

const JWT_KEY = 'huzaif123'


const Signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'plase enter the creadientials' })
    }

    const existinguser = await User.findOne({ email })

    if (existinguser) {
        return res.status(400).json({ message: 'this email is already taken' })
    }

    if (password.length <= 6) {
        return res.status(400).json({ message: 'give a strong password' })
    }

    const hasedpassword = await bcrypt.hash(password, 10)
    let users;

    try {
        users = new User({
            name,
            email,
            password: hasedpassword,
            role,
        })
        await users.save()
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.status(400).json({ message: 'sign up field' })
    }
    return res.status(201).json({ message: 'sucessfully created' })

}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'plase enter the creadientials' })
    }
    
    const existinguser = await User.findOne({ email })

    if (!existinguser) {
        return res.status(400).json({ message: 'email or password is invalid' })
    }

    const ispasswordcorrect = await bcrypt.compare(password, existinguser.password)

    if (!ispasswordcorrect) {
        return res.status(400).json({ message: 'email or password is invalid' })
    } else {
        const payload = {
            id: existinguser._id,
            username: existinguser.username,
        }
        jwt.sign(
            payload, 
            JWT_KEY,
            {expiresIn: 86400},
            (err, token) => {
                if (err) return res.json(({ message: err }))
                return res.json({
                    message: "Sucess",
                    token: "Bearer " + token
                })
            }
            
        )
    }    
}


exports.Signup = Signup
exports.login = login