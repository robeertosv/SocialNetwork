import User from '../models/user.model.js'

export const checkUsername = async (req, res) => {
    const { username } = req.body

    const user = await User.findOne({username})

    if(user) {
        return res.status(200).json({ exist: true })
    }else {
        return res.status(200).json({ exist: false })
    }
}