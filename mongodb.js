// const mongodb=require('mongodb')
// const MongoClient=mongodb.ongoClient
const {MongoClient,ObjectID}=require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

const id=new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{

    if(error){
        console.log("Unable to connect to the database");
    }

    const db=client.db(databaseName)

    // db.collection('users').insertOne({
    //     name:'Andrew',
    //     age:27
    // })


    // db.collection('users').insertMany([
    // {description:'Do Homework',completed:false},
    // {description:'eat food',completed:true},
    // {description:'do exercise',completed:true}],
    // (error,result)=>{
    //     if(error)
    //     console.log('An error occured')
    //     console.log(result.ops)
    // }
    // );



    // db.collection('users').findOne({completed:true},(error,data)=>{
    //     console.log(data);
    // })

   const updateMany=db.collection('users').updateMany({completed:true},{
       $set:{
           completed:false,
       }
   })
    
   updateMany.then((res)=>{
        console.log(res)
   }).catch((err)=>{
        console.log(err)
   })


    console.log("Connected successufully")
})





