const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
    type: String,
    enum: ['usuario', 'admin', 'superadmin'], 
    default: 'usuario',  
    required: true,
  },
    password: {
        type: String,
        required: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    saldoEuros: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'El saldo no puede ser negativo']
    },
    cuentaBancaria: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fechaAlta: {
        type: Date,
        required: true,
        default: Date.now
    },
    codigoDepartamento: {
        type: String,
        required: true,
        minlength: [3, 'El código de departamento debe tener al menos 3 caracteres'],
        maxlength: [10, 'El código de departamento no puede tener más de 10 caracteres']
    },
    codigoPostal: {
        type: String,
        required: true
    }
});




const Usuario = mongoose.model('Usuario', usuarioSchema); 

module.exports = Usuario; 