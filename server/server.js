import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import path from 'path'

import connectDB from './db/connectDB.js'
import authRouter from './routes/auth.routes.js'

configDotenv()

const port = process.env.PORT || 80
const __dirname = path.resolve()
const app = express()

const corsConfig = {
    origin: '*',
    response: 200
}

app.use(express.json())
app.use(cors(corsConfig))
app.use(express.static(path.join(__dirname, '../frontend', 'dist')))

app.use('/api/auth', authRouter)

app.get('/', (req, res) =>  res.sendFile(path.join(__dirname, '../frontend/dist/index.html')))

app.listen(port, () => {
    connectDB()
    console.log('http://localhost')
})