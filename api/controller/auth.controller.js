import user from "../models/user.model.js"
import bcryptjs from "bcryptjs"


const signup = async  (req , res) => {
    const {username , email , password} = req.body
    const hashedpassword = bcryptjs.hashSync(password , 10)

    const  newUser = new user({username , email , password : hashedpassword})
    await newUser.save()
    res.status(201).json({"message" : "user created succesfully"})
    
}


export default signup