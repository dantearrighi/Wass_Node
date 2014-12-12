var app = module.parent.exports.app, vClientes = require('../models/cliente.js');
var passport = module.parent.exports.passport;
var Admins = require('../models/admins.js');
var Users = require('../models/users.js');

var adminAuth = function (req, res, next) {
    //authorize role
    if (typeof req.user != "undefined") {
        next(); //Si el usuario existe, dale que baaaap
    } else {
        //Not authorized redirect
        res.redirect('/');
    }
}

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.flash = req.flash();
    next();
});

exports.loginGET = function (req, res) {
    res.render('login', { title: 'Login' });
};

exports.loginPOST = passport.authenticate('AdminLogin', 
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });


exports.clientes = function (req, res) { 
    
    vClientes.buscarClientes(function (cliente) {
        
        res.render('clientes', { title: 'Menú de Clientes', obj: cliente, year: new Date().getFullYear(), message: 'Administracion de Clientes' });
    })
};                    //Menu de Clientes

exports.clientesLista = function (req, res) {
    
    vClientes.buscarClientes(function (cliente) {  
        
        res.render('clientesLista', { title: 'Listado de Clientes', obj: cliente, year: new Date().getFullYear(), message: 'Listado de Clientes' });
    })
};
                                                               
exports.clientesListaFiltrada = function (req, res) {

    vClientes.buscarPorApellido(req.body.filtroBusqueda, function (cliente){

        res.render('clientesLista', { title: 'Listado de Clientes', obj: cliente, year: new Date().getFullYear(), message: 'Listado de Clientes' });
    });

   
};       //ESTE BEBE RENDERIZA LA VISTA PERO CON LA BUSQUEDA YA HECHA

exports.clienteABM = function (req, res) {  
    res.render('cliente_alta', { title: 'Añadir Cliente', year: new Date().getFullYear(), message: 'ABM de Clientes' });
}                   //MUESTRA  ABM PARA DAR DE ALTA / Form Alta

exports.crearCliente = function (req, res) {
    console.log(req.body);
    var fecha = new Date();
    var nuevoCliente = new vClientes({ 'na.nombre': req.body.nombre, 'na.apellido': req.body.apellido, dniCuil: req.body.dniCuil, claveFiscal: req.body.claveFiscal, apellido: req.body.apellido, mail: req.body.mail, tel1: req.body.tel1, tel2: req.body.tel2, 'tramite.tipoTramite': req.body.tipoTramite, 'tramite.tramitadoPor': req.body.loTramita, 'tramite.enviadoPor': req.body.deParteDe, 'tramite.detalleTramite.fechaDet': fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(), 'tramite.detalleTramite.textoDet': 'Alta del tramite texto det' });
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
            doc.na.nombre = req.body.nombre;
            doc.na.apellido = req.body.apellido;
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

exports.verTramite = function (req, res) {                  // Formulario EDICION - Busca Cliente y abre form 
    vClientes.findOne({ _id: req.params.id }, function (err, doc) {
        if (!err) {
            res.render('tramite', { title: 'Ficha del trámite', cliente: doc });
        } else {
            res.end(err);
        }
    });
};               // ver Tramite
