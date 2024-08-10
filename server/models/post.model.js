import mongoose from "mongoose";

const schema = mongoose.Schema({
    isImage: {
        required: true,
        type: Boolean
    },
    image: {
        required: false,
        type: String,
    },
    date: {
        required: true,
        type: Date,
    },
    // Required if image not present
    textContent: {
        required: false,
        type: String
    },
    likes: {
        required: true,
        type: Number,
        default: 0
    },
    comments: {
        required: false,
        type: Array,
        default: []
    },
    commentsAvailable: {
        required: true,
        type: Boolean,
        default: true
    }
})

const Post = mongoose.model('Post', schema)

export default Post