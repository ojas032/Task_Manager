require('../src/db/mongoose')
const Task=require('../src/model/Task')


Task.findByIdAndDelete('5fb54caf6a15ae231be676e0').then((tasks)=>{
    console.log(tasks);
    return Task.countDocuments({completed:false})
})
.then((result)=>{
    console.log(result)
})
.catch((err)=>{
    console.log(err)
})