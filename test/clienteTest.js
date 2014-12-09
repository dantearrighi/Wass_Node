var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crudtest');

var Clientes = require('../models/cliente.js');

var c = new Clientes( { nombre: "NombrePrueba", apellido: "Apell prueba"});

c.save(function(err, doc){
console.log('Anduvo el save!');

}
);

  