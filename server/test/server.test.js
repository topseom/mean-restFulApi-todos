const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

// beforeEach((done)=>{
//     Todo.remove({}).then(()=>{
//         done();
//     });
// });

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    });;
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'Test todo text';
        request(app)
            .post('/api/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err=>{
                    done(err);
                });
            });
    });

    it('should not create todo with invalid body data',(done)=>{
        request(app)
        .post('/api/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch(err=>{
                done(err);
            });
        });

    });
});

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
            .get('/api/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(2)
            })
            .end(done);
    });
});

describe('GET /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/api/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo notfound',(done)=>{
        request(app)
            .get(`/api/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);         
    });

    it('should return 404 if not format ObjectID',(done)=>{
        request(app)
            .get(`/api/todos/123abc`)
            .expect(404)
            .end(done);         
    });
});

describe('DELTE /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .delete(`/api/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(todos[0].text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.findById(todos[0]._id.toHexString()).then(todo=>{
                    expect(todo).toBe(null);
                    done();
                },err=>{
                    done(err);
                }).catch(err=>{
                    done(err);
                })
            });
    });

    it('should return 404 if todo notfound',(done)=>{
        request(app)
            .delete(`/api/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);         
    });

    it('should return 404 if not format ObjectID',(done)=>{
        request(app)
            .delete(`/api/todos/123abc`)
            .expect(404)
            .end(done);         
    });
});

describe('PATCH /todos/:id',()=>{

    it('should todo is completed',(done)=>{
        var text = "Update Test text";
        request(app)
            .patch(`/api/todos/${todos[0]._id.toHexString()}`)
            .send({
                completed:true,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(true);
                expect(res.body.completedAt).toBeGreaterThan(1);
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed',(done)=>{
        var text = "Update Test text";
        request(app)
            .patch(`/api/todos/${todos[1]._id.toHexString()}`)
            .send({
                completed:false,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(false);
                expect(res.body.completedAt).toBe(null);
            })
            .end(done);
    });

    it('should return 404 if todo notfound',(done)=>{
        request(app)
            .patch(`/api/todos/${new ObjectID().toHexString()}`)
            .send({})
            .expect(404)
            .end(done);         
    });

    it('should return 404 if not format ObjectID',(done)=>{
        request(app)
            .patch(`/api/todos/123abc`)
            .send({})
            .expect(404)
            .end(done);         
    });
});
