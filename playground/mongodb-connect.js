// const MongoClient = require('mongodb').MongoClient;
//this code is identical:
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	//CREATE TODO
	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 		if(err) {
	// 			return console.log('Unable to insert todo', err);
	// 		}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	//CREATE USER
	// db.collection('Users').insertOne({
	// 	name: 'Aiza',
	// 	age: 18,
	// 	location: 'Sydney'
	// }, (err, result) => {
	// 		if(err) {
	// 			return console.log('Unable to create user', err);
	// 		}
	// 	// console.log(JSON.stringify(result.ops, undefined, 2));
	// 	console.log(result.ops[0]._id.getTimestamp());
	// });

	client.close();
});


