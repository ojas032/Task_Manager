const express=require('express')
const router=new express.Router()
const Task=require('../model/Task')
const auth=require('../Middleware/auth')

router.post('/task',auth,async (req,res)=>{
console.log("added task")
    const task=new Task({
        ...req.body,
        owner:req.user._id
    });
    try{
    const result=await task.save()
        res.status(201).send(result)
    }catch(err){
        res.status(400).send("Error reported")
    }
})

//GET task limit /task?limit=2&skip=2
//here limit means we limit the search result s
//GET sortBy=CreatedAt:desc or asc

router.get('/task',auth,async (req,res)=>{
    const match={}
    const sort={}
    limit=parseInt(req.query.limit)
    skip=parseInt(req.query.skip)

    if(req.query.completed)
    match.completed=req.query.completed==='true'


    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]= parts[1]==='desc'?-1:1
    }


    try{
    const user=req.user
    await user.populate({
        path:'tasks',
        match,
        options:{
            limit,
            skip,
            sort
        }
    }).execPopulate()
    const result=user.tasks

    res.status(200).send(result)
    }
    catch(err){
        res.status(500).send(err)
    }
})



router.get('/task/:id',auth,async (req,res)=>{
    const _id=req.params.id
    try{
        const result=await Task.findOne({_id,'owner':req.user._id})
        if(!result)
        res.status(404).send()


        res.status(200).send(result)
    }
    catch(err){
        res.status(501).send(err)
    }
})

router.delete('/task/:id',auth,async (req,res)=>{
    const _id=req.params.id

    try{
        const task=Task.findOneAndDelete({_id,'owner':req.user._id})
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