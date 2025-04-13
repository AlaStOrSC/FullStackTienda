const Product = require('../models/Product');

async function insertProduct(productData) {
    try {
        console.log('Iniciando inserción del producto');
        const product = new Product(productData);
        const res = await product.save();
        console.log('Producto insertado:', res);
        return res;
    } catch (err) {
        console.error('Error al insertar producto:', err);
        throw err;
    }
}

async function getProducts() {
    try {
        const products = await Product.find();
        console.log('Products:', products);
        return products;  
    } catch (err) {
        console.error('Error al obtener productos:', err);
        throw err;
    }
}

async function updateProduct(id, productData) {
    try {
        productData.ultimaActualizacion = new Date();
        const res = await Product.findByIdAndUpdate(id, productData, { new: true });
        console.log('Producto actualizado:', res);
        return res;  
    } catch (err) {
        console.error('Error al actualizar producto:', err);
        throw err;
    }
}

async function deleteProduct(id) {
    try {
        const res = await Product.findByIdAndDelete(id);
        console.log('Producto eliminado:', res);
        return res;  
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        throw err;
    }
}

async function getProductById(id) {  
    try {
        const res = await Product.findById(id); 
        console.log('Producto obtenido:', res);
        return res;
    } catch (err) {
        console.error('Error al obtener el producto:', err);
        throw err;
    }
}

module.exports = { insertProduct, updateProduct, getProducts, deleteProduct, getProductById };
