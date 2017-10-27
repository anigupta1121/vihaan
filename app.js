var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/*const csvFilePath = 'D:\\a';
const csv = require('csvtojson')

csv().fromFile(csvFilePath)
    .on('json', function(jsonObj) {
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
        console.log(jsonObj.size());
}).on('done', function(error) {
    console.log(error);
    console.log('end');
})*/

const request=require('request');
const csv=require('csvtojson');

csv()
    .fromStream(request.get('https://firebasestorage.googleapis.com/v0/b/healthcare-27168.appspot.com/o/a.csv?alt=media&token=69f31129-0790-49dc-9c6d-2a454ce7b6a8'))
    .on('csv',function(csvRow,rowIndex){
   // console.log(csvRow,rowIndex)
})
    .on('record_parsed',function(jsonObj, row, index){

        console.log(jsonObj)
})
.on('done',function(error){
console.log(error)
})

module.exports = app;
