const express = require('express');
const rounter = express.Router();

const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {Todo} = require('../models/todo');

rounter.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});
rounter.get('/todos/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        res.status(404).send();
    }
    Todo.findById(req.params.id).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch(err=>{
        res.status(400).send();
    });
});

rounter.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        if(!todos){
            res.status(404).send({});
        }
        res.send(todos);
    }).catch(err=>{
        res.status(400).send(err);
    });
});

rounter.delete('/todos/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        res.status(404).send();
    }
    Todo.findByIdAndRemove(req.params.id).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch(err=>{
        res.status(400).send();
    });
});

rounter.patch('/todos/:id',(req,res)=>{
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
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);
    }).catch(err=>{
        res.status(400).send();
    });
});

module.exports = rounter;