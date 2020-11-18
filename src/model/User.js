const mongoose=require('mongoose');
const validator=require('validator');

const User=mongoose.model('Users',{

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            console.log(value)
           if(!validator.isEmail(value)){
               throw new Error("email is invalid")
           }
           
        }
    },
    password:{
        type:String,
        require:true,
        trim:true,
        validate(value){
            if(value.includes("password")){
                throw new Error("Cannot be accepted")
            }
        }
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<1){
                throw new Error("Age is invalid")
            }
        }
    }
})


module.exports=User;