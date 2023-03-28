const express = require("express");
const {UserModel} = require("../Models/user.schema.js");
const {Product} = require("../Models/product.schema.js");
const UserRouter = express.Router();
  
UserRouter.post("/signup",async (req,res)=>{
      const user = req.body;
      try { 
        const exist = await UserModel.findOne({username:req.body.username});
        if(exist){
          return res.status(401).json({message:'User already exists'});
        } 
        const newuser = new UserModel(user);
        await newuser.save();
        res.status(200).json({message:user})
      } catch (error) {
        console.log("Error while SignUp",error.message);
      }
});

UserRouter.post("/login", async(req,res)=>{
        const username = req.body.username;
      const password = req.body.password;
     try {
      let user = await UserModel.findOne({username:username,password:password});
      if(user){
        return res.status(200).json({data:user});
      }else{
        return res.status(401).json("Invalid Credential");
      }
     } catch (error) {
         res.status(500).json("Error while Login",error.message);  
     }
})
UserRouter.get("/products", async (req,res)=>{
       try {  
        const products = await Product.find({});
        res.status(200).json(products);
       } catch (error) {
          res.status(500).json({"Error while Get":error.message});
       }
})
UserRouter.get("/product/:id",async (req,res)=>{
       const id = req.params.id;
      try {
         const product = await Product.findOne({'id':id});
         res.status(200).json(product);
      } catch (error) {
        res.status(500).json({message:error.message})
      }
})

UserRouter.post("/payment",async (req,res)=>{
   
})
module.exports = {UserRouter};