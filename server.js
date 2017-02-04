var fs = require('fs');
var express = require('express');
var http = require('http');
var https = require('https');
var compression = require('compression');
var path = require('path');

var sslKey = fs.readFileSync('letsencrypt/privkey.pem', 'utf8');
var sslCert = fs.readFileSync('letsencrypt/cert.pem', 'utf8');
var ca = [
  fs.readFileSync('letsencrypt/chain.pem', 'utf8'), 
  fs.readFileSync('letsencrypt/fullchain.pem', 'utf8')
]; 

var creds = {
  key: sslKey,
  cert: sslCert,
  ca: ca
};

var app = express();
app.use(compression());

app.get('/background.jpg', function(request, response) {
    response.sendFile(path.join(__dirname+'/public/background.jpg'));
});

app.get('/nj.png', function(request, response) {
    response.sendFile(path.join(__dirname+'/public/nj.png'));
});

app.get('/sitemap.txt', function(request, response) {
    response.sendFile(path.join(__dirname+'/public/sitemap.txt'));
});

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname+'/public/home.html'));
    console.log(request.ip + ' ' + (new Date()));
});

http.createServer(app).listen(8080);
https.createServer(creds, app).listen(8443);
