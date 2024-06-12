import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import { errorHandler  }from './utils/error.js'

dotenv.config()
const app = express()
mongoose.connect(process.env.MONGO).then(()=> console.log( "connected to db")).catch((err)=> console.log(err));


app.use(express.json())
app.use(express.urlencoded({extended: true})) 

app.listen(3000, () => {
    console.log('server is running on port 3000')
})

app.use("/api/user" , userRouter)
app.use("/api/auth" , authRouter)
app.use(cookieParser())

// using error handlers 
app.use(errorHandler)
// if we are using it like this , this can be used anywere in the program 

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    statuscode: err.status || 500,
  });
});

