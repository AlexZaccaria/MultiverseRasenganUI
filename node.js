'use strict';   

var compression     = require('compression');
var express         = require('express');

var app = express();
app.use(compression());
app.use(express.static(__dirname + '/public_html/static'));
app.use(function(err, req, res, next) { console.log("Error: "+err); });

app.get('/temi/arancio', function(req, res) 
{ res.sendFile(__dirname + '/themes/arancio.css'); });
app.get('/temi/verde', function(req, res) 
{ res.sendFile(__dirname + '/themes/verde.css'); });
app.get('/temi/rosa', function(req, res) 
{ res.sendFile(__dirname + '/themes/rosa.css'); });
app.get('/temi/multi', function(req, res) 
{ res.sendFile(__dirname + '/themes/multi.css'); });
app.get('/temi/marrone', function(req, res) 
{ res.sendFile(__dirname + '/themes/marrone.css'); });
app.get('/temi/viola', function(req, res) 
{ res.sendFile(__dirname + '/themes/viola.css'); });
 
app.listen(3000);