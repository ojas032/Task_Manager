const express=require('express')
const app=express()
require('./db/mongoose')
const Users=require('./model/User')
const Task=require('./model/Task')
const port=process.env.PORT||3002

app.use(express.json())

app.post('/users',async (req,res)=>{
    const user=new Users(
        req.body
    )

    try{
    const result = await user.save();
    res.status(201).send(result)
    }
    catch(e){
    res.status(400).send("Testing")
    }

    
})

app.get('/users/:id',async (req,res)=>{
    try{
    const result = await Users.findById(req.params.id)
    res.status(200).send(result)
    }
    catch(err){
    res.status(401).send(err)
    }
})


app.get('/users', async (req,res)=>{
    try{
    const result= await Users.find({})
    res.status(200).send(result)
    }catch(err){
    res.status(500).send(err)
    }
})

app.patch('/users/:id',async (req,res)=>{
    const _id=req.params.id;
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


app.delete('/users/:id',async (req,res)=>{
    const _id=req.params.id;
    try{
        const user=await Users.findByIdAndDelete(_id)
        if(!user){
            res.status(400).send("error");
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})





app.post('/task',async (req,res)=>{
    const task=new Task(req.body);
    try{
    const result=await task.save()
        res.status(201).send(result)
    }catch(err){
        res.status(400).send("Error reported")
    }
})


app.get('/task',async (req,res)=>{
    try{
    const result=await Task.find({})
    res.status(200).send(result)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/task/:id',async (req,res)=>{
    const _id=req.params.id

    try{
        const result= Task.findById(_id)
        res.status(200).send(result)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.delete('/task/:id',async (req,res)=>{
    const _id=req.params.id

    try{
        const task=Task.findByIdAndDelete(_id)
        if(!task){
            res.status(400).send("error")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(err)
    }
})



app.listen(port,()=>{
    console.log("System is up on port "+port)
})