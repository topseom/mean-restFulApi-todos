var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

switch(process.env.NODE_ENV){
    case 'production':
        mongoose.connect('mongodb://monchai:seven77889900@ds243805.mlab.com:43805/demo-todo').then(()=>{
            //success!
        },(err)=>{
            console.log(err);
        });
        break;
    case 'development':
        mongoose.connect('mongodb://localhost:27017/TodoApp').then(()=>{
            //success!
        },(err)=>{
            console.log(err);
        });
        break;
}
module.exports = {
    mongoose
}