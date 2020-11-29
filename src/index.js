const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
require('./db/mongoose')
const Users=require('./model/User')
const Task=require('./model/Task')
const userRouter=require('./router/User')
const taskRouter=require('./router/Task')
const port=process.env.PORT||3001




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(port,()=>{
    console.log("System is up on port "+port)
})

const jwt=require('jsonwebtoken')

const myfunction = async ()=>{

    const load=jwt.sign({_id:"1234"},"thisisthenewcourse")
    
    //console.log(load)

}

myfunction()