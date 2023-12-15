import User from '../models/User'
import Role from '../models/Role'
import jwt from 'jsonwebtoken'
import config from '../config'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']

        if (!token) return res.status(403).json({ message: 'No token provided' })

        const decoded = jwt.verify(token.split(' ')[1], config.SECRET)
        req.userId = decoded.id

        const user = await User.findById(decoded.id, { password: 0 })

        if (!user) return res.status(404).json({ message: 'User not found' })

        next()
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 })

    const roles = await Role.find({_id: {$in: user.roles}})

    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next()
            return
        }
    }

    return res.status(403).json({ message: 'You are not a moderator' })
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 })

    const roles = await Role.find({_id: {$in: user.roles}})

    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next()
            return
        }
    }

    return res.status(403).json({ message: 'You are not an admin' })
}
