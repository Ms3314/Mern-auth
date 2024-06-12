import user from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
import { json } from "express"



export const signup = async  (req , res , next) => {
    // ---> firstly we are destructuring our content that we got from our req
    const {username , email , password} = req.body
    // ---> then we are hashing our password
    const hashedpassword = bcryptjs.hashSync(password , 10)
    // ---> then we are creating a new user
    const  newUser = new user({username , email , password : hashedpassword})
    // ---> then we are saving our user
    
    // the intresting path is that you dont add the cookie over here you only add the cookie when you sign in and not when you create your account
    try{
       await newUser.save()
       res.status(201).json({"message" : "user created succesfully"})
       res.redirect("/signin")
    } catch (error) {
        // ---> created a costum error middleware so that we dont have to write length things
        //res.status(500).json( error.message )
        next(error)
        // next(errorHandler(980 , "you suck mate"))
    }}

export const signin = async (req , res , next) => {
    const {email , password} = req.body
    try { 
        const validUser = await user.findOne({email})   
        if(!validUser) return next(errorHandler(404 , "User Not found"))
        const validPass = bcryptjs.compareSync(password , validUser.password)
        if(!validPass) return next(errorHandler(401 , "Wrong Credenials"))
        //res.status(200).json(validUser)
        const token = jwt.sign({id : validUser._id} , process.env.SECRET_KEY)
        const {password: hashedpassword, ...others} = validUser._doc;

        const expirtDate = new Date(Date.now() + 3600000)
        res.cookie('access_token', token , {httpOnly : true , expires : expirtDate}).status(200).json(others)
        //res.status(200).json("user Created")
    } catch (error) {
        next(errorHandler(900 , "bro you got something wrong here"))
    }


}


export const google = async (req , res , next) => {
    const {name ,  email , photo} = req.body
    try {
        const Existinguser = await user.findOne({email})
        if (Existinguser) {
            const token = jwt.sign({id : Existinguser._id} , process.env.SECRET_KEY)
            const {password , ...others} = Existinguser._doc
            const expiryDate = new Date(Date.now() + 3600000);
            console.log("the token for google OAuth is set")
            res.cookie('access_token' , token , {httpOnly : true , expires : expiryDate}).status(200).json(others)
        } else {
        const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(randomPassword , 10)
        const username = name.split(" ").join("").toLowerCase() + Math.round(Math.random()*10000).toString()
        const newUser = new user({username, email , password : hashedPassword , profilePicture : photo})
        await newUser.save()
        const token = jwt.sign({id : newUser._id} , process.env.SECRET_KEY)
        const {password: hashedpassword, ...others} = newUser._doc
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token' , token , {httpOnly : true , expires : expiryDate}).status(200).json(others)
    }
} catch (error) {
    next(error)
    }
}

export const signOut = async (req , res , next) => {
    res.clearCookie('access_token').status(200).json("user sign out")
    console.log("user sign out")

}

