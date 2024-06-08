import user from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"


const signup = async  (req , res , next) => {
    const {username , email , password} = req.body
    const hashedpassword = bcryptjs.hashSync(password , 10)

    const  newUser = new user({username , email , password : hashedpassword})
    try{
       await newUser.save()
       res.status(201).json({"message" : "user created succesfully"})
    } catch (error) {
        //res.status(500).json( error.message )
        next(error)
        // next(errorHandler(980 , "you suck mate"))
    }
    
}


export default signup