import User from '../models/user.model.js'
import checkSign from '../utils/checkCookie.js'

export const checkUsername = async (req, res) => {
    const { username } = req.body

    const user = await User.findOne({ username })

    if (user) {
        return res.status(200).json({ exist: true })
    } else {
        return res.status(200).json({ exist: false })
    }
}

export const getUserProfile = async (req, res) => {
    const { username } = req.body;

    const user = await User.findOne({ username })

    const result = {
        name: user.name,
        bio: user.bio,
        pic: user.pic,
        verified: user.isVerfied,
        private: user.isPrivate,
        seguidores: user.followers.length,
        seguidos: user.following.length,
        banned: user.isBanned
    }

    return res.status(200).json(JSON.stringify(result))
}

export const getUID = async (req, res) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ username })
        return res.status(200).json({ UID: user._id })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const getUsernameByToken = async (req, res) => {
    const data = await checkSign(req)
    console.log(data)
    return res.status(200).json(data)
}