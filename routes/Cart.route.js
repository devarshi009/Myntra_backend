const express=require("express")
const {CartModel}=require("../model/Cart.model")
const cartRouter=express.Router()
require("dotenv").config()
cartRouter.use(express.json())

cartRouter.get("/",async(req,res)=>{
    try{
        const carts=await CartModel.find()
        res.send(carts)
    }catch(err){
console.log({"msg":"something is fissy!",err:err});
    }
})

cartRouter.post("/postcart",async(req,res)=>{
    const payload=req.body;
    try{
      const cart=new CartModel(payload)
      await cart.save() 
      res.send("cart created") 
    }catch(err){
        console.log({"msg":"something is fissy!",err:err})
        res.send("error at the time of creating")
    }
})


cartRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id
    const cart=await CartModel.find({_id:id})
    
    const cartid=cart[0].userID
    const cartreqid=req.body.userID
    try{
      if(cartid!==cartreqid){
        res.send("You are not Authorized person") 
      }else{
        await CartModel.findByIdAndUpdate({_id:id},payload) 
        res.send("cart updated")
      }
      
     
    }catch(err){
        console.log({"msg":"something is fissy!",err:err})
        res.send("error at the time of updating")
    }
})


cartRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
       await CartModel.findByIdAndDelete({_id:id})
          res.send("cart Deleted") 
        }catch(err){
          console.log({"msg":"something is fissy!",err:err})
          res.send("error at the time of deleting")
      }
})
module.exports={cartRouter}