import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app=express()
 app.use(express.json())
 app.use(express.urlencoded())
 app.use(cors())

 mongoose.connect("mongodb://localhost:27017/myloginregisterdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
 },()=>{
    console.log("db connected")
 })
//schema
 const userschema= new mongoose.Schema({
   name:String,
   email:String,
   password:String
 })

 //model
 const User=new mongoose.model("User",userschema)
 

//routes
 app.post("/Login",(req,res)=>{
   const {email,password}=req.body
   User.findOne({email:email},(err,user)=>{
    if(user){
      if(password==user.password){
        res.send({message:"login successfully",user:user})
      }else{
        res.send({message:"password didn't match"})
      }

    }else{
      res.send({message:"user not registered"})
    }
   })
 })

 app.post("/Register",(req,res)=>{
   const {name,email,password}= req.body
   User.findOne({email:email},(err,user)=>{
    if(user){
      res.send({message:"user already registered"})
    } else{
      const user=new User({
        name,
        email,
        password
       })
      user.save(err=>{
        if(err){
          res.send(err)
        } else{
          res.send({message:"sucessfully resgistered ,please login now"})
        }
       })
     

    }
   })
  
})
 app.listen(9002,()=>{
   console.log("be started at port 9002")
 })


 