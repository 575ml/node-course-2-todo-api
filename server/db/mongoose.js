const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var url = process.env.DATABASEURL;
// var url = process.env.DATABASEURL || "mongodb://localhost/TodoApp";
mongoose.connect(url);


module.exports = {mongoose};