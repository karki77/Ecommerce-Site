import User from '../models/user.model.js';
 //bcryptjs
 //error handlers(notfound,errorhandler)
 //logger

const signup = async(req, res, next) => {
    try{ 
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
    //let {registeredName, registeredEmail, registeredIsAdmin} = registereduser;
    res.send({
        message: "User registered successfully",
        user: {
            _id:newuser._id,
            name: newuser.name,
            email:newuser.email,
            isAdmin : newuser.isAdmin,
        },
    });
} catch (err){
    next(err);
}
};

export { signup };