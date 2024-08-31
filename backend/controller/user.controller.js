import User from '../models/user.model.js';
import createToken from '../utils/token.utils.js';
import asyncHandler from '../middleware/asynchandler.middleware.js';


 //bcryptjs
 //error handlers(notfound,errorhandler)
 //logger

const signup =  asyncHandler(async(req, res, next) => {
     
    let {name, email, password, isAdmin} = req.body;
    let userexists = await User.findOne({email})
    if(userexists){
        let err = new Error (`User with email ${email} already exists!`)
        err.status = 400;
        throw err;
    }  
      
    
    let newuser = await User.create({
        name,
        email,
        password,
        isAdmin,
    });
    createToken(res, user._id);
    res.send({
        message: "User registered successfully",
        user: {
            _id:newuser._id,
            name: newuser.name,
            email:newuser.email,
            isAdmin : newuser.isAdmin,
        },
    });
 });

const login =  asyncHandler(async(req, res, next) => {
    
        let {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            let err = new Error (`${email} not registered!`);
            err.status = 400;
            throw err
        }
      if(await user.matchPassword(password)){
        createToken(res,user._id);
        res.send({message: "Login Success"});
      } else{
        let err = new Error ("Invalid Password");
        err.status = 400;
        throw err;
      }
    });

const logout = asyncHandler((req, res) => {
    res.clearCookie("jwt");
    res.send({ message:`Logout success!`});
});

const getUsers = asyncHandler(async(req, res) => {
    let users = await User.find({}).select("-password");
    res.send(users);
});



export { signup, login, logout, getUsers };