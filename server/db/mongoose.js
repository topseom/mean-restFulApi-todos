var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp').then(()=>{
//     console.log('1234');
// },(err)=>{
//     console.log(err);
// });
mongoose.connect('mongodb://monchai:seven77889900@ds243805.mlab.com:43805/demo-todo').then(()=>{
    //success!
},(err)=>{
    console.log(err);
});

module.exports = {
    mongoose
}