import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js"

export const test =
    (req, res) => {
        res.json( {message: 'this api is working!! '})
    }


 export const updateUser = async (req , res , next) => {
    // console.log(req.user) this one comes from the vertifcation thing like out token checks if you are logged in or not wala logic
    // console.log(req.params) this is which we send from the client side from the hadleSumbit part wala jsx
    console.log(req.body , "this is the server side body taken from the client side")
    if (req.user.id !== req.params.id ) {
        console.log("the user id is not the same as the params id")
        return next(errorHandler(401 , 'you can update only your account'))
    }

    try {
        if(req.body.password) {
            // console.log("the password is not empty" , req.body)
            req.body.password = bcryptjs.hashSync(req.body.password , 10)
        }
        // it will find an id that matches with the params ki id that you send from the client side 
        const updatedUser = await User.findByIdAndUpdate(req.params.id , {
            $set: {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                ProfilePicture : req.body.profilePicture
            }
        },{new : true})

        const {password , ...others} = updatedUser._doc
        // console.log(updateUser)
        res.status(200).json(others)
        
    } catch (error) {
        next(error)
  }
 }

 export const deleteUser = async (req , res , next) => {
    if(req.user.id !== req.params.id) {
        console.log("the user id is not the same as the params id")
        return next(errorHandler(401 , 'you can delete only your account'))
    }
    try {  
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    } catch (error) {
        next(error)
    }
 }
