
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var ClientesRoutes = require('./routes/ClientesRoutes');
var http = require('http');
var path = require('path');
var glob = require('glob');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + "localhost" +'/test');
var DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'connection error'));
DB.once('open', function callback() {
    console.log('DB está conectada con Mongoose');
});
var cliente = mongoose.model('cliente', require('./models/cliente.js'));


var app = exports.app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//require('./routes/main.js');
app.get('/', routes.index); 
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/tramites', routes.tramites);

//CLIENTES ---> GET Y POST
app.get('/clientes', ClientesRoutes.clientes);                           //--//--//   Menu de Clientes   //--//--// (Organizado según orden de ejecución)
app.get('/crearCliente', ClientesRoutes.clienteABM);                     // MUESTRA ABM PARA DAR DE ALTA
app.post('/clienteNuevoCreado', ClientesRoutes.crearCliente);            // CREA Y GUARDA EL Cliente 
app.get('/clienteGuardado', ClientesRoutes.clienteGuardadoConfirm);      // CONFIRMA Cliente CREADO
app.get('/clientesLista', ClientesRoutes.clientesLista);                 // LISTADO
app.post('/clientesLista', ClientesRoutes.clientesListaFiltrada);        // LISTA FILTRADA POR BUSQUEDA
app.get('/eliminarCliente/:id', ClientesRoutes.eliminarCliente);         // ELIMINA Cliente
app.get('/clienteEliminado', ClientesRoutes.clienteEliminadoConfirm);    // CONFRIMA Cliente Eliminado
app.get('/edit/:id', ClientesRoutes.editarCliente);                      // FORMULARIO DE EDICION
app.post('/edit/:id', ClientesRoutes.editarClienteConfirmar);                 // CONFIRMA EDICION 
   
       
    


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
