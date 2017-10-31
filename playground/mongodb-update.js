//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err){
        return console.log('Unable to connect mongodb server');
    }
    console.log('Connect to mongodb server');

    // db.collection('Users').findOneAndUpdate({
    //     _id:new ObjectID("59f81473cb352303cf544685")}
    // ,{
    //     $set:{
    //         name:"Monchai"
    //     },
    //     $inc:{
    //         age:1    
    //     }
    // },{
    //     returnOriginal:false
    // }).then(result=>{
    //      console.log(result);
    // });

    db.close();
});