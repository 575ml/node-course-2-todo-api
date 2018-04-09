// const MongoClient = require('mongodb').MongoClient;
//this code is identical:
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	//deleteMany Todos
	// db.collection('Todos').deleteMany({text: 'Cook and eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	//deleteOne Todos
	// db.collection('Todos').deleteOne({text: 'Cook and eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	//findOneAndDelete Todos
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	//deleteMany Users
	// db.collection('Users').deleteMany({name: 'Aiza'}).then((result) => {
	// 	console.log(result);
	// });

	//findOneAndDelete
	// db.collection('Users').findOneAndDelete({name: 'Ally'}).then((result) => {
	// 	console.log(result)
	// });

	//or use ObjectID
	db.collection('Users').findOneAndDelete({_id: new ObjectID('5acbf3b6b4f3a71794378002')
	}).then((results) => {
		console.log(JSON.stringify(results, undefined, 2));
	});

	db.collection('Users').find().count().then((count) => {
		console.log(`Users count: ${count}`);
		// console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch Users', err);
	});

	// client.close();
});


