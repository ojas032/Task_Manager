const express=require('express')
const app=express()
require('./db/mongoose')
const Users=require('./model/User')
const Task=require('./model/Task')
const port=process.env.PORT||3002

app.use(express.json())

app.post('/users',(req,res)=>{
    const user=new Users(
        req.body
    )
    user.save().then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
    res.send("testing!")
})

app.get('/users/:id',(req,res)=>{
    console.log("hekjdjkslfls")
    res.status(200).send("tesing")
})

app.get('/users',(req,res)=>{
    Users.find({}).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})


app.post('/task',(req,res)=>{
    const task=new Task(req.body);
    task.save().then((result)=>{
        res.status(201).send("Task reveived")
    }).catch((err)=>{
        res.status(400).send("Error reported")
    })
})



app.listen(port,()=>{
    console.log("System is up on port "+port)
})