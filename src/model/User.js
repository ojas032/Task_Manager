const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Task=require('./Task')

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]

})

userSchema.virtual('tasks',{
    ref:'task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJson= async function(){
    const user=this;
    userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
}

userSchema.methods.generateAuthToken = async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'thisismynewcourse')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentails=async (email,password)=>{
    const user=await User.findOne({email})

    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error("Unable to login")
    }
    
    return user
}

userSchema.pre('save',async function(next){
    const user=this
    //console.log(user)
    if(user.isModified('password')){
        const hashpassword=await bcrypt.hash(user.password,8)
        user.password=hashpassword
    }

    next()
})

userSchema.pre('remove',async function(next){
    const user=this;
    await Task.deleteMany({'owner':user._id});
    next()
})

const User=mongoose.model('Users',userSchema)


module.exports=User;