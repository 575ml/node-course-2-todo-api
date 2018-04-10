var	express    = require('express'),
	bodyParser = require('body-parser'),
	{mongoose} = require('./db/mongoose'),
	{Todo}     = require('./models/todo'),
	{User}     = require('./models/user'),
	app 	   = express(),
	{ObjectID} = require('mongodb');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

//POST todos
app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

//GET todos
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

//GET a todo
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	// res.send(req.params);

	//ID is invalid
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
		console.log("Invalid ID");
	}

	Todo.findById(id).then((todo) => {
		if(!todo){
			console.log(err);
			return res.status(404).send();
		}
			res.send({todo});

	//ID is valid but can't find it
	}).catch((e) => {
		console.log("Can't find todo");
		res.status(400).send("Can't find todo");
	})
});


//SERVER
app.listen(port, () => {
	console.log(`Server running on poty: ${port}`);
});

module.exports = {app};