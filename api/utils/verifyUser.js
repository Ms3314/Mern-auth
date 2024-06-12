import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

 const verifyToken = async (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies['access_token'];
    if (!token) {
        console.log("token not found");
        return next(errorHandler(401, "You are not authenticated!"))
    }

    jwt.verify(token , process.env.SECRET_KEY, (err , user) => {
        if (err) {
            console.log(err)
            console.log("this shit is stopping at token not valid place") ;
            return next(errorHandler(403, "Token is not valid "))
        }
        req.user = user;
        next();
    })
}

export default verifyToken