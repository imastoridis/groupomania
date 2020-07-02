//Imports
var express = require('express')
var bodyParser =require('body-parser')
var apiRouter = require('./apiRouter').router

//Starts server
var server = express()

//Body parser configuration
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

//Configurate routes
server.get('/', function(req, res) { //function = callback
    res.setHeader('Content-Type','text/html') //Entête de la requete reponse http
    res.status(200).send('<h1>Bonjour</h1>')
})

server.use('/api/', apiRouter)

//Launch server
server.listen(8080, function() {
    console.log('Serveur en ecoute')
})