const {ObjectID} = require('mongodb'),
	  {mongoose} = require('./../server/db/mongoose'),
	  {Todo}     = require('./../server/models/todo'),
	  {User}	 = require('./../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result); 
// });

//Todo.findOneAndRemove this removes it and returns it back to give you info
//Todo.findByIdandRemove returns also

Todo.findByIdAndRemove('5acd610df3b5cb0fc2a7f02f').then((todo) => {
	console.log(todo);
});


// Todo.findOneAndRemove({_id: '5acd610df3b5cb0fc2a7f02f'}).then((todo) => {
// 	console.log(todo)
// });

