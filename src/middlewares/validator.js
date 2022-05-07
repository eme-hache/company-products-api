import { ROLES } from '../models/Role'
import User from '../models/User'

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { userName, email } = req.body

    const userNameExists = await User.findOne({ userName })

    if (userNameExists) return res.status(400).json({ message: 'Username already exists' })

    const userEmail = await User.findOne({ email })

    if (userEmail) return res.status(400).json({ message: 'Email already exists' })

    next()
}

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({ message: `Role ${req.body.roles[i]} does not exist` })
            }
        }
    }

    next()
}