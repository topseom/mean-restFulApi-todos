const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then(result=>{
//     console.log(result);
// });

//findOneAndRemove
//findByIdAndRemove

// Todo.findOneAndRemove({text:"eiei"}).then(result=>{
//     console.log(result);
// },err=>{
//     console.log(err);
// });

// Todo.findByIdAndRemove('59f84e42cb352303cf544eaf').then(result=>{
//     console.log(result);
// },err=>{
//     console.log(err);
// });