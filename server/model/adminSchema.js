const mongoose=require("mongoose");

const user= new mongoose.Schema({
  email:{type:String,required:true},
  password:{type:String,required:true},
  isAdmin:{type:Boolean,required:true},
})

const User=mongoose.model("user",user);

module.exports=User;