const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProductController);

router.get('/:id', productController.getProductByIdController);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router; 