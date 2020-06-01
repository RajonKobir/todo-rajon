var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// To fix all deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


// connect to database
mongoose.connect('mongodb+srv://rajon:1003371573@cluster0-6mw5z.gcp.mongodb.net/test?retryWrites=true&w=majority');


// create a schema of the db
var todoSchema = new mongoose.Schema({
    item: String
});


// database model
// dtabase name will be "test" and model/collection name will be "todos" for 'Todo' or 'todo'
var Todo = mongoose.model('Todo', todoSchema);


// example data item
// var itemOne = Todo({item: 'buy flowers!'}).save(function(err){
//     if(err) throw err;
//     console.log("item saved!");
// });


// var data = [
//     {item:'get milk'},
//     {item:'walk dog'},
//     {item:'water plants'}
// ];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){






app.get('/', function(req, res){
    // get data from mongoDB and pass it to view
    Todo.find({}, function(err, data){  // find {} means look into allitems in the database.
        if (err) throw err;
        res.render('todo', {todo: data});
    });
    // res.render('todo', {todo: data});
});






app.post('/' , urlencodedParser, function(req, res){
    // get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });
    //data.push(req.body);
    //res.json(data);
});





app.delete('/:item', function(req, res){
    //console.log(req.params.item);

// delete requested item from mongoDB
// Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){  // remove is old version
// To fix deprecation warnings use deleteOne or deleteMany for remove
Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
    if (err) throw err;
    res.json(data);
});

    // data = data.filter(function(todo){
    //    //console.log(todo.item.replace(/ /g, "-"));
    //     return todo.item.replace(/ /g, "-") !== req.params.item.replace(/ /g, "-"); // means, replace all spaces by hiphens
    // });
    // res.json(data);
});


};