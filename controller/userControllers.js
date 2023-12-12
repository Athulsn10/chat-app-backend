const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const { response } = require('express');
const generateToken = require('../config/generateToken')

// user registration
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password,pic} = req.body;
    console.log(pic);
    if(!name || !email || !password){
        response.status(400);
        throw new Error('please Enter All Fields')
    }
    const userExists = await User.findOne({email})
    if(userExists){
        response.status(400);
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        throw new Error("failed to create user")
    }
});
// user authentication
const authUser =asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if( user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error("invalid credentials")
    }
})
// get user
const allUsers = asyncHandler(async(req,res)=>{
    const keyword = req.query.search ? {
        $or:[ 
            // 
            {name:{$regex: req.query.search, $options:"i"}},
            {email:{ $regex : req.query.search, $options:"i"}}
        ]
    }:{ 
        // else part
    };
    // to get all other users expect the one who searched
    const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users);
})



module.exports={registerUser,authUser, allUsers}