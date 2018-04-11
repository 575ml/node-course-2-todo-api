const expect     = require('expect'),
	  request    = require('supertest'),
	  {app}      = require('./../server'),
	  {Todo}     = require('./../models/todo'),
	  {ObjectID} = require('mongodb');

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo'
}];

//wipe data before test
beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		//Test that there's string in text
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) =>{
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				//assert
				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => (e));
			});
	});


	//Test text shouldn't be empty string
	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				//assert
				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					// expect(todos[0].text).toBe({});
					done();
				}).catch((e) => done(e));
			});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
})

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		//make sure you get a 404 back
		// var fakeID = '5acc97075b46691e64614edb';
		var hexId = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${hexId}.toHexString()`)
			.expect(404)
			.end(done);
		});

	it ('should return 404 for non-object ids', (done) => {
		//todos/123
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });


	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();

		request(app)
			.delete(`/todos/${hexId}.toHexString()`)
			.expect(404)
			.end(done);
		});

	it('should return 404 if ObjectID is invalid', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});
});
