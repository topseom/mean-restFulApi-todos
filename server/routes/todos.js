const express = require('express');
const rounter = express.Router();

const {ObjectID} = require('mongodb');
const {authenticate} = require('../middleware/autheticate');
const _ = require('lodash');

var {Todo} = require('../models/todo');

rounter.post('/todos',authenticate, async (req,res)=>{
    var todo = new Todo({
        text:req.body.text,
        _creator:req.user._id
    });
    try{
        const doc = await todo.save();
        res.send(doc);
    }catch(e){
        res.status(400).send(e);
    };
    
});
rounter.get('/todos/:id',authenticate, async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        res.status(404).send();
    }
    try{
        const todo = await Todo.findOne({
            _id:req.params.id,
            _creator:req.user._id
        });
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }catch(e){
        res.status(400).send();
    }
});

rounter.get('/todos',authenticate, async (req,res)=>{
    try{
        const todos = await Todo.find({
            _creator: req.user._id
        });
        if(!todos){
            res.status(404).send({});
        }
        res.send(todos);
    }catch(e){
        res.status(400).send(e);
    }
});

rounter.delete('/todos/:id',authenticate,async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        res.status(404).send();
    }
    try{
        const todo = await Todo.findOneAndRemove({
            _id:req.params.id,
            _creator:req.user._id
        });
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }catch(e){
        res.status(400).send();
    }
});

rounter.patch('/todos/:id',authenticate, async (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    try{
        const todo = await Todo.findOneAndUpdate({
            _id:id,
            _creator:req.user._id
        },{$set:body},{new:true});
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }catch(e){
        res.status(400).send();
    }
});

module.exports = rounter;