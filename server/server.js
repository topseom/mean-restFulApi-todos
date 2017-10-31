var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text:{
        type: String,
        required: true,
        minlength: 1,
        trim:true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default:null
    }
});

var User = mongoose.model('User',{
    email:{
        type: String,
        trim:true,
        minlength:1,
        required:true
    },
    password:{

    }
})

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc)=>{
//     console.log('Save todo',doc);
// },(e)=>{
//     console.log('Unable to save');
// });

// var otherTodo = new Todo({text:' Edit the video'});

// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save',e);
// });

var user = new User({
    email:"topseom@gmail.com"
})

user.save().then((doc)=>{
    console.log(JSON.stringify(doc,undefined,2));
},(e)=>{
    console.log('Unable to save',e);
});

