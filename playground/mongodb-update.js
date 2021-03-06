// const MongoClient = require('mongodb').MongoClient;
//this code is identical:
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/TodoApp', (err, client) =>{
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	//Update Todo
	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID("5acc0e2bf859da2f9ab38d56")
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	//Update User
	// db.collection('Users').findOneAndUpdate({
	// 	_id: new ObjectID('5acbf25eb4f3a71794377f31')
	// }, {
	// 	$set: { name: "Isa" },
	// 	$inc: { age: 1 }
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });

	// client.close();
});


