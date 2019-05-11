const express = require('express');

// set up express app
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var port = 3000;


//connect to mongodb
mongoose.connect('mongodb://localhost/Ubergo');
mongoose.Promise = global.Promise ;
// handle htm/css/images
app.use(express.static('public'));
// body-parser middleware
app.use(bodyParser.json());

// route handlers middleware
app.use('/api',require('./routes/API'));

//error handler middleware
app.use(function(err ,req ,res ,next ){
    console.log(err);
    res.status(422).send({error: err._message});
});
// listen for request;
app.listen( process.env.port || port , function(){
    console.log('now listening for requests ...');
});
