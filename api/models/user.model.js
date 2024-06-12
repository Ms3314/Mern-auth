import mongoose  from "mongoose";
// ---> database is created 
const userSchema = new mongoose.Schema({
    username :{
        type : String , 
        required : true ,
        unique : true
    } ,
    email :{
        type : String , 
        required : true ,
        unique : true
    } , 
    password :{
        type : String , 
        required : true ,
    } , 
    ProfilePicture :{
        type : String , 
        default : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2PjJUFaJOIfUDIVZ5vekDA&ust=1718248208784000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiiocKL1YYDFQAAAAAdAAAAABAE',
    } ,
}, {timestamps :true})

const User = mongoose.model("User" , userSchema)
export default User 
