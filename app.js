// setup port for online and local 
var PORT = process.env.PORT || 3000;

var express = require('express');
var todoController = require('./controllers/todoController');


var app = express();

// setup template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));


//fire controllers
todoController(app);


// listen to a port
app.listen(PORT);
console.log('you are listenning to port '+PORT);  // dynamic port number
