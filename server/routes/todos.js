const express = require('express');
const rounter = express.Router();

const {ObjectID} = require('mongodb');
const {authenticate} = require('../middleware/autheticate');
const _ = require('lodash');

var {Todo} = require('../models/todo');

rounter.post('/todos',authenticate,(req,res)=>{
    var todo = new Todo({
        text:req.body.text,
        _creator:req.user._id
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});
rounter.get('/todos/:id',authenticate,(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        res.status(404).send();
    }
    Todo.findOne({
        _id:req.params.id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch(err=>{
        res.status(400).send();
    });
});

rounter.get('/todos',authenticate,(req,res)=>{
    Todo.find({
        _creator: req.user._id
    }).then((todos)=>{
        if(!todos){
            res.status(404).send({});
        }
        res.send(todos);
    }).catch(err=>{
        res.status(400).send(err);
    });
});

rounter.delete('/todos/:id',authenticate,(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id:req.params.id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch(err=>{
        res.status(400).send();
    });
});

rounter.patch('/todos/:id',authenticate,(req,res)=>{
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
    Todo.findOneAndUpdate({
        _id:id,
        _creator:req.user._id
    },{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch(err=>{
        res.status(400).send();
    });
});

module.exports = rounter;