import User from '../models/User'
import Role from '../models/Role'
import config from '../config'
import jwt from 'jsonwebtoken'

export const signIn = async (req, res) => {
    const { email, password } = req.body

    const userFound = await User.findOne({ email }).populate('roles')
    
    if (!userFound) return res.status(400).json({ message: 'User not found' })

    const matchPassword = await User.comparePassword(password, userFound.password)

    if (!matchPassword) return res.status(401).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ token })
}

export const signUp = async (req, res) => {
    const { userName, email, password, roles } = req.body
    
    const newUser = new User({
        userName,
        email,
        password: await User.encryptPassword(password),
    })

    if (roles) {
        const foundRoles = await Role.find({ name: {$in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: 'user' })
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ token })
}