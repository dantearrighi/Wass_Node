var mongoose = require('mongoose'), Schema = mongoose.Schema;
var clienteSchema = new Schema({
    na: {
        nombre: String,
        apellido: String,
        },
    dniCuil: Number,
    claveFiscal: String,
    mail: String,
    tel1: String,
    tel2: String,
    
},
{
collection: 'clientes'
});



clienteSchema.static("buscarPorDNI", function (filtro, cb) {
    this.find({dniCuil: filtro }, function (err, r) {
        cb(r);
    });
});

clienteSchema.static("buscarClientes", function (cb) {
    this.find({ }, function (err, r) {
        cb(r);
    });
});

/*
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
*/
module.exports = mongoose.model('cliente', clienteSchema); //en teoria, esto se podria llamar desde otro lado.