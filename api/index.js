import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
mongoose.connect(process.env.MONGO).then(()=> console.log( "connected to db")).catch((err)=> console.log(err));

app.listen(5000, () => {
    console.log('server is running on port 5000')
})

app.get("/" , (req, res) => {
    res.send("hello world")
})
