const express=require('express')
const router=new express.Router()
const Users=require('../model/User')
const auth=require('../Middleware/auth')


router.post('/users',async (req,res)=>{
    const user=new Users(
        req.body
    )
    try{
  
    const result = await user.save();
    const token=await user.generateAuthToken()
    res.status(201).send({result,token})
    }
    catch(e){
    res.status(400).send("Testing")
    }
})

router.post('/users/logout',auth,async (req,res)=>{

    try{
    req.user.tokens=req.user.tokens.filter(token=>{
       // console.log(req.token)
        return req.token!=token.token
    })

    await req.user.save()
    //console.log(req.user)
    res.status(200).send('Successfully Logout')
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    //console.log(req.user.tokens.length)
    try{
        while(req.user.tokens.length>0){
            req.user.tokens.pop();
        }
        await req.user.save();
        console.log(req.user)

        res.status(200).send("Logged out of all devices")
    }
    catch(e){
        res.status(500).send("Error")
    }


})


router.post('/users/login', async (req,res)=>{
    try{
        console.log(req.body)
        const user=await Users.findByCredentails(req.body.email, req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).send({user,token})
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})



router.get('/users/me',auth, async (req,res)=>{
    res.status(200).send(req.user)
    
    
})

router.get('/users/:id', auth ,async (req,res)=>{
    try{
    const result = await Users.findById(req.params.id)
    res.status(200).send(result)
    }
    catch(err){
    res.status(401).send(err)
    }
})


router.patch('/users/me',auth,async (req,res)=>{
    const _id=req.user._id;
    try{
    const user= await Users.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
    if(!user)
    res.status(401).send("Error")
    else
    res.status(200).send(result)
    }
    catch(err){
    res.status(401).send(err);
    }
})


router.delete('/users/me',auth,async (req,res)=>{
  
    try{
        req.user.remove();
        res.status(200).send("Deleted")
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports=router;