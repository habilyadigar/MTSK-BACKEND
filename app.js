"use strict";
//require("dotenv").config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const soap = require('soap');
const{addAddressWsdl}= require("./api/temporder/tmporder.service")
const fs = require('fs');
var http = require('http');
/////////////////////////////////
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const userRouter = require('./api/users/user.router')
const tempOrderRouter = require('./api/temporder/tmporder.router')
const orderRouter = require('./api/order/order.router')
/////////////////////////////////
const indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

const serviceObject = {
  addAddressService: {
            addAddressServiceSoapPort: {
              addAddress: addAddressWsdl
          },
          addAddressServiceSoap12Port: {
            addAddress: addAddressWsdl
        }
    }
};

var wsdlService = fs.readFileSync('service.wsdl', 'utf8');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.xml());

////////ROUTESSSSSS/////////////
app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/api/users',userRouter);
app.use('/api/temporder',tempOrderRouter);
app.use('/api/order',orderRouter);
////////ROUTESSSSSS/////////////


var server = app.listen(8000)
var wsdl_path ="/wsdl"
soap.listen(server, wsdl_path, serviceObject, wsdlService);
console.log("Check http://localhost:8000" + wsdl_path+"?wsdl to see if the service is working");



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;