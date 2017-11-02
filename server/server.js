var env = process.env.NODE_ENV || 'development';
if(env == 'development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env == 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else if(env == 'production'){
    process.env.MONGODB_URI = 'mongodb://monchai:seven77889900@ds243805.mlab.com:43805/demo-todo';
}


const express = require('express');
const bodyParser = require('body-parser');

var allowCrossDomain = require('./header');
var {mongoose} = require('./db/mongoose');
var todos = require('./routes/todos');

var app = express();

app.use(allowCrossDomain);
var port = process.env.PORT || 3000;
app.use(bodyParser.json());



app.get('/',(req,res)=>{
    res.send("Welcome to rest api!");
});
app.use('/api',todos);

app.listen(port,()=>{
    console.log("Serve run at localhost:"+port);
});

module.exports = {app};

