import User from '../models/User'

export const getUsers = async (_, res) => {
    const users = await User.find()
        .select('-password')
        .populate('roles')

        console.log(users)

    res.json(users)
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId)
        .select('-password')
        .populate('roles')

    res.json(user)
}

export const updateUserById = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })

    res.json(user)
}

export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId)

    res.status(204).json()
}