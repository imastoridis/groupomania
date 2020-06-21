//Imports
var express = require('express')

var server = express()

//Configurate routes
server.get('/', function(req, res) { //function = callback
    res.setHeader('Content-Type','text/html') //Entête de la requete reponse http
    res.status(200).send('<h1>Bonjour</h1>')
})

//Launch server
server.listen(8080, function() {
    console.log('Serveur en ecoute')
})