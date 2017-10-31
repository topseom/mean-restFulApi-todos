const express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());



// app.get('/',(req,res)=>{
//     res.send("Hello World");
// });

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res)=>{
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

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        if(!todos){
            res.status(404).send({});
        }
        res.send(todos);
    }).catch(err=>{
        res.status(400).send(err);
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

