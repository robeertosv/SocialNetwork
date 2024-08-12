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
        id: user._id.toString(),
        name: user.name,
        bio: user.bio,
        pic: user.pic,
        verified: user.isVerfied,
        private: user.isPrivate,
        seguidores: user.followers,
        seguidos: user.following,
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
    
    return res.status(200).json(data)
}

export const requestFollow = async (req, res) => {
    try {
        const { id, username } = req.body

        const follower = await User.findOne({ _id: id })

        const followed = await User.findOne({ username })

        if(followed.isPrivate) {
            return res.status(200).json({ error: "Deberás pedir una solicitud"})
        } else {
            let followerFollowings = follower.following
            let followedFollowers = followed.followers
            
            followerFollowings.push(followed._id.toString())
            followedFollowers.push(follower._id.toString())

            await User.findByIdAndUpdate(follower._id, {following: followerFollowings} )
            await User.findByIdAndUpdate(followed._id, {followers: followedFollowers })

        
            return res.status(200).json({ error: 'Os habeis empezado a seguir', followedFollowers: typeof(followedFollowers), followerFollowings})
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}