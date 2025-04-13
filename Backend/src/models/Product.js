const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser negativo']
    },
    categoria: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    codigoProducto: {
        type: String,
        required: true,
        unique: true
    },
    fechaFabricacion: {
        type: Date,
        required: true
    },
    garantiaMeses: {
        type: Number,
        required: true,
        min: [0, 'La garantía no puede ser negativa']
    },
    peso: {
        type: Number,
        required: true,
        min: [0, 'El peso no puede ser negativo']
    },
    dimensiones: {
        alto: {
            type: Number,
            required: true,
            min: [0, 'El alto no puede ser negativo']
        },
        ancho: {
            type: Number,
            required: true,
            min: [0, 'El ancho no puede ser negativo']
        },
        profundidad: {
            type: Number,
            required: true,
            min: [0, 'La profundidad no puede ser negativa']
        }
    },
    coloresDisponibles: {
        type: [String],
        default: []
    },
    etiquetas: {
        type: [String],
        default: []
    },
    imagenes: {
        type: [String],
        default: []
    },
    esActivo: {
        type: Boolean,
        required: true,
        default: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    ultimaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;