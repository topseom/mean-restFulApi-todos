//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err){
        return console.log('Unable to connect mongodb server');
    }
    console.log('Connect to mongodb server');
    db.close();
});