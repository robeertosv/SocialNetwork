import mongoose from "mongoose"

const connectDB = () => {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log('DB Connected')
    }).catch((e) => {
        console.log(e.message, '\n' ,e)
    })
}

export default connectDB