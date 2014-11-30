
var app = module.parent.exports.app, vClientes = require('../models/cliente.js');



app.get('/', function(req, res) {
    vClientes.buscarClientes(function (pers) {
        res.render('index', { title: 'Listado', obj: pers });
    });
});

app.get('/new', function (req, res) {
    res.render('new', { title: 'Nuevo', obj: {} });
});

app.post('/new', function(req, res) {
    var vNuevoCliente = new vClientes({ nombre: req.body.nombre, apellido: req.body.apellido });
    vNuevoCliente.save(function (err, vNuevoCliente) {
        res.redirect("/");
    });
});



