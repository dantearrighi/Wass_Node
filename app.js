
/**
 * Module dependencies.
 */
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = exports.passport = require('passport');
var fixtures = require('mongoose-fixtures');
var Admins = require('./models/admins.js');

var express = require('express');
var routes = require('./routes');
var ClientesRoutes = require('./routes/ClientesRoutes');
var http = require('http');
var path = require('path');
var glob = require('glob');
var mongoose = require('mongoose');
var adminAuth = function (req, res, next) {
    //authorize role
    if (typeof req.user != "undefined") {
        next();
    } else {
        //Not authorized redirect
        res.redirect('/login');
    }
}



fixtures.load('/Documentos/GitHub/Wass_Node/fixtures');

mongoose.connect('mongodb://' + "localhost" + '/test');

//fixtures.load('./fixtures/admins.js');
//fixtures.load('./fixtures/persons.js');
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
app.use(session({ secret: 'supersecret', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./auth/local-strategy.js');
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});



// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//require('./routes/main.js');
app.get('/', adminAuth, routes.index); 
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/tramites', routes.tramites);

//CLIENTES ---> GET Y POST
app.get('/clientes', ClientesRoutes.clientes);                              //--//--//   Menu de Clientes   //--//--// (Si nos organizamos cojemos todos)
app.get('/crearCliente', ClientesRoutes.clienteABM);                              // MUESTRA ABM PARA DAR DE ALTA
app.post('/clienteNuevoCreado', ClientesRoutes.crearCliente);                     // CREA Y GUARDA EL Cliente 
app.get('/clienteGuardado', ClientesRoutes.clienteGuardadoConfirm);               // CONFIRMA Cliente CREADO
app.get('/clientesLista', ClientesRoutes.clientesLista);                          // LISTADO
app.post('/clientesLista/:filtro', ClientesRoutes.clientesListaFiltrada);         // LISTA FILTRADA POR BUSQUEDA
app.get('/eliminarCliente/:id', ClientesRoutes.eliminarCliente);                  // ELIMINA Cliente
app.get('/clienteEliminado', ClientesRoutes.clienteEliminadoConfirm);             // CONFRIMA Cliente Eliminado
app.get('/edit/:id', ClientesRoutes.editarCliente);                               // FORMULARIO DE EDICION
app.post('/edit/:id', ClientesRoutes.editarClienteConfirmar);                     // CONFIRMA EDICION 
   
       
app.get('/verTramite/:id', ClientesRoutes.verTramite);                      //--//--//   Menu de Tramites //--//--// 


//LOGIN
app.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
});

app.post('/login', passport.authenticate('AdminLogin', 
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
