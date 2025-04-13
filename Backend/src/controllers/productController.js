const { getProducts, updateProduct, insertProduct, deleteProduct, getProductById } = require('../services/productsServices');
const { createProductValidations, updateProductValidations, getProductValidations, getProductByIdValidation, deleteProductValidation  } = require('../validations/productValidations');

const productController = {
    getProductController: [
        ...getProductValidations,
        async (req, response) => {
            try {
                const data = await getProducts();
                response.status(200).json(data);
            } catch (error) {
                console.log('Error al recoger producto de la BBDD', error);
                response.status(500).json({ error: 'Error al recoger producto de la BBDD' });
            }
        }
    ],

    getProductByIdController: [
        ...getProductByIdValidation, 
        async (req, response) => {
            try {
                const { id } = req.params;
                const product = await getProductById(id);
           
                response.status(200).json(product); 
            } catch (error) {
                console.log('Error al obtener el producto por ID', error);
                response.status(500).json({ error: 'Error al obtener el producto por ID' });
            }
        }
    ],

    createProduct: [
        ...createProductValidations,
        async (req, response) => {
            try {
                const newProduct = await insertProduct(req.body);
                response.status(201).json(newProduct);
            } catch (error) {
                console.log('Error al crear producto', error);
                response.status(500).json({ error: error.message });
            }
        }
    ],

    updateProduct: [
        ...updateProductValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const productData = req.body;
                const updatedProduct = await updateProduct(id, productData);
                response.status(200).json(updatedProduct);
            } catch (error) {
                console.log('Error al actualizar producto', error);
                response.status(500).json({ error: 'Error al actualizar producto' });
            }
        }
    ],
    deleteProduct: [
        ...deleteProductValidation,
        async (req, response) => {
        try {
            const { id } = req.params;
            await deleteProduct(id);
            response.status(200).json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar producto', error);
            response.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
]};

module.exports = productController;
