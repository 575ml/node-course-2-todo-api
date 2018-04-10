var	express    = require('express'),
	bodyParser = require('body-parser'),
	{mongoose} = require('./db/mongoose'),
	{Todo}     = require('./models/todo'),
	{User}     = require('./models/user'),
	app 	   = express();

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

//SERVER
app.listen(port, () => {
	console.log(`Server running on poty: ${port}`);
})

module.exports = {app};