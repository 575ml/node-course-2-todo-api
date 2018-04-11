var env = process.env.NODE_ENV || 'development';
console.log('env ***********', env);

if (env === 'development') {
	process.env.PORT = 5000;
	process.env.DATABASEURL = 'mongodb://localhost/TodoApp';
} else if (env === 'test') {
	process.env.PORT = 5000;
	process.env.DATABASEURL = 'mongodb://localhost/TodoAppTest';
}