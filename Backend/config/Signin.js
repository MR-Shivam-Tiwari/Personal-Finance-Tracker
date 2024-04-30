const express=require('express');
const mongoose=require('mongoose');

const SigninSchema=new mongoose.Schema({
    email:{type:String},
    password:{type:String}, 
    

})
const Signin = mongoose.model('Signin',SigninSchema)
module.exports=Signin;