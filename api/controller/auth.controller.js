import user from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"


const signup = async  (req , res , next) => {
    // ---> firstly we are destructuring our content that we got from our req
    const {username , email , password} = req.body
    // ---> then we are hashing our password
    const hashedpassword = bcryptjs.hashSync(password , 10)
    // ---> then we are creating a new user
    const  newUser = new user({username , email , password : hashedpassword})
    // ---> then we are saving our user 
    try{
       await newUser.save()
       res.status(201).json({"message" : "user created succesfully"})
    } catch (error) {
        // ---> created a costum error middleware so that we dont have to write length things
        //res.status(500).json( error.message )
        next(error)
        // next(errorHandler(980 , "you suck mate"))
    }
    
}


export default signup