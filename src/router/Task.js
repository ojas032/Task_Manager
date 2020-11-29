const express=require('express')
const router=new express.Router()
const Task=require('../model/Task')

router.post('/task',async (req,res)=>{
    const task=new Task(req.body);
    try{
    const result=await task.save()
        res.status(201).send(result)
    }catch(err){
        res.status(400).send("Error reported")
    }
})


router.get('/task',async (req,res)=>{
    try{
    const result=await Task.find({})
    res.status(200).send(result)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get('/task/:id',async (req,res)=>{
    const _id=req.params.id

    try{
        const result= Task.findById(_id)
        res.status(200).send(result)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.delete('/task/:id',async (req,res)=>{
    const _id=req.params.id

    try{
        const task=Task.findByIdAndDelete(_id)
        if(!task){
            res.status(400).send("error")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})


module.exports=router