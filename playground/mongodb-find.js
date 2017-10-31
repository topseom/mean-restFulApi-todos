//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err){
        return console.log('Unable to connect mongodb server');
    }
    console.log('Connect to mongodb server');

    // db.collection('Todos').find({_id:new ObjectID('59f7f48d31ea9608891068fc')}).toArray().then((docs)=>{
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("Unable to fetc todos");
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count ${count}`);
    // },(err)=>{
    //     console.log("Unable to fetc todos");
    // });

    // db.collection('Users').find({name:'top'}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //      console.log("Unable to fetc todos");
    // });

    db.close();
});