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



const myfunction = async ()=>{

    

    // const task=await Task.findById('5fc4146ce7d9ce1fbe4b59a6')
    // console.log(task)
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)


   
}

//myfunction()
