const jwt=require('jsonwebtoken');
const User=require('../model/User')

const user= async (req,res,next) =>{
    try{
    const token=req.header('Authorization').replace('Bearer ','')
    const decode=jwt.verify(token,'thisismynewcourse');
    const user=await User.findOne({_id:decode._id,'tokens.token':token})
    console.log(user)
    if(!user){
       throw new Error()   
    }
    req.user=user;
    req.token=token
    next();
    }
    catch(e){
        res.status(401).send("error");
    }

    

}

module.exports=user;