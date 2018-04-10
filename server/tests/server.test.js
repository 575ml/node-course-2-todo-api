const expect  = require('expect'),
	  request = require('supertest'),
	  {app}   = require('./../server'),
	  {Todo}  = require('./../models/todo');

//wipe data before test
beforeEach((done) => {
	Todo.remove({}).then(() => done());
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
				Todo.find().then((todos) => {
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
					return done (err);
				}
				//assert
				Todo.find().then((todos) => {
					expect(todos.length).toBe(0);
					// expect(todos[0].text).toBe({});
					done();
				}).catch((e) => (e));
			});
	});
});

