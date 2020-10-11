//Imports
var express = require('express')
var bodyParser =require('body-parser')
var apiRouter = require('./apiRouter').router
var cors = require('cors');
//Starts server
var server = express()

//Body parser configuration
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Configurate routes
server.get('/', function(req, res) { //function = callback
    res.setHeader('Content-Type','text/html') //Entête de la requete reponse http
    res.status(200).send('<h1>Bonjour</h1>')
})

server.use('/api/', apiRouter)

//Launch server
/*
server.listen(8080, function() {
    console.log('Serveur en ecoute')
})*/

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
server.listen(port);