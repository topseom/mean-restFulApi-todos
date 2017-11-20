const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {User} = require('../models/user');
const {authenticate} = require('../middleware/autheticate');

router.get("/users",(req,res)=>{
    res.send('hello user!');
});

router.get("/users/me",authenticate,(req,res)=>{
    res.send(req.user);
});

router.post("/users/login",async (req,res)=>{
    var body = _.pick(req.body,['email','password']);
    try{
        const user = await User.findByCredentials(body.email,body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user); 
    }catch(e){
        res.status(400).send();
    }
});

router.delete("/users/me/token",authenticate, async (req,res)=>{
    try{
        await req.user.removeToken(req.token);
        res.status(200).send();
    }catch(e){
        res.status(400).send();
    }
});

router.post("/users",async (req,res)=>{
    try{
        const body = _.pick(req.body,['email','password']);
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user); 
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;