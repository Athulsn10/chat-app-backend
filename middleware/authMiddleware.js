const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req,res,next)=>{
    let token;

    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try{
            // remove bearer and take token
            token = req.headers.authorization.split(" ")[1]
            // token is decode id
            const decoded = jwt.verify(token,process.env.JWT_TOKEN)
            // return user id without the password
            req.user=await User.findById(decoded.id).select("-password");
            // move to nxt operation
            next(); 
        }catch(error){
            res.status(401);
            throw new Error("Token Failed due to unauthorisation")
        }
    }
    if(!token){
        res.status(401);
        throw new Error('token not authorized')
    }
})

module.exports = {protect}