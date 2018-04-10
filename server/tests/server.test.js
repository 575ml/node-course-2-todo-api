const expect  = require('expect'),
	  request = require('supertest'),
	  {app}   = require('./../server'),
	  {Todo}  = require('./../models/todo');


const todos = [{
	text: 'First test todo'
}, {
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
