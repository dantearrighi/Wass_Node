var mongoose = require('mongoose'), Schema = mongoose.Schema;
var clienteSchema = new Schema({
    nombre: String,
    apellido: String,
    dniCuil: Number,
    claveFiscal: String,
    mail: String,
    tel1: String,
    tel2: String,
},
{
collection: 'clientes'
});


/*clienteSchema.static("crearClienteDoit", function ( nombre,  apellido, dni,  mail,  tel1, tel2, cb) {
    var clientenuevo = mongoose.model('Cliente', clienteSchema);
    var cnew = new clientenuevo({ nombre: nombre, apellido: apellido, dni: dni, mail: mail, tel1: tel1, tel2: tel2 });
    
    cnew.save(function (err, cnew) {
        if (err) return console.error(err);
       
    }) , function (err, r) {
        cb(r);
    };
});*/
/*
function crearCliente(nombre, apellido, dni, mail, tel1, tel2, callback) {
    
    var clientenuevo = mongoose.model('Cliente', clienteSchema);
    var cnew = new clientenuevo({ nombre: nombre, apellido: apellido, dni: dni, mail: mail, tel1: tel1, tel2: tel2 });

    cnew.save(function (err, cnew) {
        if (err) return console.error(err);
       
    });

    };

/*clienteSchema.static("crearCliente", function (cb) {
    this.constructor({ nombre: "nombre", apellido: "apellido", dni:"dni", mail: "mail", tel1:"tel1", tel2:"tel2"  }, function (err, r) {
        r.nombre = nombre;
        r.apelido = apellido;
        r.dni = dni;
        r.mail = mail;
        r.tel1 = tel1;
        r.tel2 = tel2;
        r.save(function (err, cl) {
            cb(cl);
        });

        cb(r);
       
    });
});
        
*/

/*
personaSchema.static("buscarAlumnos", function (cb) {
    this.find({ cargo: "Alumno" }, function (err, r) {
        cb(r);
    });
});

*/

clienteSchema.static.buscarPorDNI = function (dniCuil, cb) {
    this.find({ dniCuil: req.body.dniCuil }, cb);
}

clienteSchema.static("buscarClientes", function (cb) {
    this.find({ }, function (err, r) {
        cb(r);
    });
});
clienteSchema.static("eliminarcliente", function (id, cb) {
    this.remove({ _id: id, nombre: "cliente" }, function (err) {
        cb();
    });
});
clienteSchema.static("obtenercliente", function (id, cb) {
    this.find({ _id: id, nombre: "cliente" }, function (err, r) {
        cb(r);
    });
});
clienteSchema.static("editarcliente", function (id, name, cb) {
    this.findOne({ _id: id, nombre: "cliente" }, function (err, r) {
        r.nombre = name;
       
        r.save(function (err, cl) {
            cb(cl);
        });
    });
});
clienteSchema.static("buscarPorNombre", function (name, cb) {
    this.find({ nombre: name }, function (err, r) {
        cb(r);
    });
});

module.exports = mongoose.model('cliente', clienteSchema); //en teoria, esto se podria llamar desde otro lado.