const {mongoose} = require('./../server/db/mongoose'),
	  {Todo}	 = require('./../server/models/todo'),
	  {User}    = require('./../server/models/user'),
	  {ObjectID} = require('mongodb');


//************** TODO ******************//
// var id = '5acc97075b46691e64614eda';

// if(!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

//Retuns an array of string
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });
// //If wrong ID, you get: []

// //Returns a variable string
// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// })
// If wrong ID, you get: null

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log ('Id not found');
// 	}
// 	console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));
//If wrong ID, you get: null

//************** USER ******************//
var userId = '5acc15bfe3a6af36830d77e2';

//Find user by ID
if(!ObjectID.isValid(userId)) {
	console.log('ID not valid');
}

User.findById(userId).then((user) => {
	if(!user) {
		return console.log('Id not found');
	}
	console.log(JSON.stringify(user, undefined, 2));
	// console.log('User: ', user);
}).catch((e) => console.log(e));

