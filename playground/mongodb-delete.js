//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err){
        return console.log('Unable to connect mongodb server');
    }
    console.log('Connect to mongodb server');

    // db.collection('Todos').deleteMany({text:"Eat lunch"}).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log("Unable to remove user");
    // });


    // db.collection('Todos').deleteOne({text:"Eat lunch"}).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log("Unable to remove user");
    // });

    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log("Unable to remove user");
    // });

    // db.collection('Users').deleteMany({name:"top"}).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log("Unable to remove user");
    // });

    // db.collection('Users').findOneAndDelete({name:"Mike"}).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log("Unable to remove user");
    // });


    db.close();
});