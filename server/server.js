require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

var allowCrossDomain = require('./header');
var {mongoose} = require('./db/mongoose');
var todos = require('./routes/todos');
var users = require('./routes/users');

var app = express();

app.use(allowCrossDomain);
var port = process.env.PORT || 3000;
app.use(bodyParser.json());



app.get('/',(req,res)=>{
    res.send("Welcome to rest api!");
});
app.use('/api',[todos,users]);

app.listen(port,()=>{
    console.log("Serve run at localhost:"+port);
});

module.exports = {app};

