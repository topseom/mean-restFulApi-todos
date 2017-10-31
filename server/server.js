const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
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

