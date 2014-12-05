var app = module.parent.exports.app, vClientes = require('../models/cliente.js');

exports.clientes = function (req, res) { 
    
    vClientes.buscarClientes(function (cliente) {
        
        res.render('clientes', { title: 'Menú de Clientes', obj: cliente, year: new Date().getFullYear(), message: 'Administracion de Clientes' });
    })
};                    //Menu de Clientes

exports.clientesLista = function (req, res) {
    
    vClientes.buscarClientes(function (cliente) {  //MUESTRA LA LISTA
        
        res.render('clientesLista', { title: 'Listado de Clientes', obj: cliente, year: new Date().getFullYear(), message: 'Listado de Clientes' });
    })
};

exports.clienteABM = function (req, res) {  
    res.render('cliente_alta', { title: 'Añadir Cliente', year: new Date().getFullYear(), message: 'ABM de Clientes' });
}                   //MUESTRA  ABM PARA DAR DE ALTA / Form Alta

exports.crearCliente = function (req, res) {   
    console.log(req.body);
    var nuevoCliente = new vClientes({ 'na.nombre': req.body.nombre,'na.apellido': req.body.apellido, dniCuil: req.body.dniCuil, claveFiscal: req.body.claveFiscal, apellido: req.body.apellido, mail: req.body.mail, tel1: req.body.tel1, tel2: req.body.tel2});
    nuevoCliente.save(function (err, doc) {
        if (!err) {
            res.redirect('/clienteGuardado');
        } else {
            res.end(err);
        }
    });
}                 // Toma datos del form y Guarda el Cliente

exports.clienteGuardadoConfirm = function (req, res) {
    res.render('clienteGuardado', { title: 'Cliente Guardado exitosamente' }); 
}       // Confirmacion Cliente Guardado

exports.eliminarCliente = function (req, res) {
    
    vClientes.remove({ _id: req.params.id }, function (err, doc) {  
        if (!err) {
            res.redirect('/clienteEliminado');
        } else {
            res.end(err);
        }
    });
   
};             // Elimina al cliente

exports.clienteEliminadoConfirm = function (req, res) {
    res.render('cliente_elim', { title: 'cliente Eliminado' }); //SE HA ELIMINADO UN CLIENTE DEL WASS
}      // Confirmación Cliente Eliminado

exports.editarCliente = function (req, res) {                  // Formulario EDICION - Busca Cliente y abre form 
    vClientes.findOne({ _id: req.params.id }, function (err, doc) {
        if (!err) {
            res.render('cliente_edit', { title: 'Editar', cliente: doc });
        } else {
            res.end(err);
        }
    });
};               // Editar Cliente

exports.editarClienteConfirmar = function (req, res) {  
    vClientes.findOne({ _id: req.params.id }, function (err, doc) {
        if (!err) {
            doc.nombre = req.body.nombre;
            doc.apellido = req.body.apellido;
            doc.dniCuil = req.body.dniCuil;
            doc.claveFiscal = req.body.claveFiscal;
            doc.mail = req.body.mail;
            doc.tel1 = req.body.tel1;
            doc.tel2 = req.body.tel2;
            doc.save(function (err, doc) {
                if (!err) {
                    res.redirect('/clientesLista');
                } else {
                    res.end(err);
                }
            });
        } else {
            res.end(err);
        }
    });
};      // POST EDICION - Guarda los cambios

