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

router.post("/users",(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    
    user.save().then(user=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user); 
    }).catch(err=>{
        res.status(400).send(err);
    });
});

module.exports = router;