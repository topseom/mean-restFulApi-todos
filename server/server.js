var env = process.env.NODE_ENV || 'development';
if(env == 'development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env == 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else if(env == 'production'){
    process.env.MONGODB_URI = 'mongodb://monchai:seven77889900@ds243805.mlab.com:43805/demo-todo';
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());



// app.get('/',(req,res)=>{
//     res.send("Hello World");
// });

app.post('api/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});
app.get('api/todos/:id',(req,res)=>{
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

app.get('api/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        if(!todos){
            res.status(404).send({});
        }
        res.send(todos);
    }).catch(err=>{
        res.status(400).send(err);
    });
});

app.delete('api/todos/:id',(req,res)=>{
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

app.patch('api/todos/:id',(req,res)=>{
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

app.listen(port,()=>{
    console.log("Serve run at localhost:"+port);
});

// var user = new User({
//     email:"topseom@gmail.com"
// })

// user.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save',e);
// });

module.exports = {app};

