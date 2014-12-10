var app = module.parent.exports.app, vClientes = require('../models/cliente.js');


exports.index = function (req, res) {
    var msg = req.flash('message');
    res.render('index', { title: 'WASS', year: new Date().getFullYear() });
};


exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page.' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
};


exports.tramites = function (req, res) {
    res.render('tramites', { title: 'Menú de trámites' });
};



var app = module.parent.exports.app, vClientes = require('../models/cliente.js');

/*
exports.clientes = function (req, res)
{
 //ESTO NO ESTOY SEGURO QUE ES
    
    vClientes.buscarClientes(function (cliente) {
        
        res.render('clientes', { title: 'Listado de Clientes', obj: cliente, year: new Date().getFullYear(), message: 'Administracion de Clientes' });
    })
};

exports.listaClientes = function (req, res) {
    
    vClientes.buscarClientes(function (cliente)
    {
  //MUESTRA LA LISTA
        
        res.render('listaClientes', { title: 'Listado de Clientes', obj: cliente, year: new Date().getFullYear(), message: 'Administracion de Clientes' });
    })
};

exports.clienteABM = function (req, res)
{
  //ESTO MUESTRA EL ABM PARA DAR DE ALTA
    res.render('clientesABM', { title: 'Clientes', year: new Date().getFullYear(), message: 'ABM de Clientes' });
}


exports.clienteELIMINAR = function (req, res) {
    
    vClientes.remove({ _id: req.params.id }, function (err, doc)
    {
  //ESTO -->>>ELIMINA<<<-- al CLIENTE
        if (!err) {
            res.redirect('/clienteEliminado');
        } else {
            res.end(err);
        }
    });
   
};

exports.clienteEliminado = function (req, res) {
    res.render('clienteEliminado', { title: 'cliente Eliminado' }); //SE HA ELIMINADO UN CLIENTE DEL WASS
}




exports.editarCliente = function (req, res)
{
        //muestra la edicion
    vClientes.findOne({ _id: req.params.id }, function (err, doc) {
        if (!err) {
            res.render('editCliente', { title: 'Editar', cliente: doc });
        } else {
            res.end(err);
        }
    });
};

exports.editarClientePost = function (req, res)
{
  //Guarda los cambios
    vClientes.findOne({ _id: req.params.id }, function (err, doc) {
        if (!err) {
            doc.nombre = req.body.name;
            doc.apellido = req.body.age;
            doc.dni = req.body.dni;
            doc.mail = req.body.e;
            doc.apellido = req.body.age;
            doc.apellido = req.body.age;
            doc.save(function (err, doc) {
                if (!err) {
                    res.redirect('/list');
                } else {
                    res.end(err);
                }
            });
        } else {
            res.end(err);
        }
    });
};
*/