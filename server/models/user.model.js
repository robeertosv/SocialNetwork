import mongoose from 'mongoose'

// username, name, password, isVerified, isBanned, followers, followed, posts
const schema = mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    pic: {
        required: true,
        type: String,
        default: ''
    },
    isPrivate: {
        required: true,
        type: Boolean,
        default: true
    },
    isVerfied: {
        required: true,
        type: Boolean,
        default: false
    },
    isBanned: {
        required: true,
        type: Boolean,
        default: false
    },
    // Array con los UID de los seguidores
    followers: {
        required: false,
        type: Array,
        default: []
    },
    // Array con los UID de los seguidos
    following: {
        required: false,
        type: Array,
        default: []
    },
    // Array con el postID
    posts: {
        required: false,
        type: Array,
        default: []
    }
})

const User = mongoose.model('User', schema)

export default User;