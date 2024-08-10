import mongoose from 'mongoose'

const schema = mongoose.Schema({
    comentor: {
        required: true,
        type: String
    },
    post: {
        required: true,
        type: String
    },
    comment: {
        required: true,
        type: String
    }
})

const Comment = mongoose.model('Comment', schema)

export default Comment;