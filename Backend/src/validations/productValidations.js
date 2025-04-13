const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createProductValidations = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('descripcion')
        .notEmpty()
        .withMessage('La descripción es requerida')
        .isString()
        .withMessage('La descripción debe ser texto'),

    body('precio')
        .notEmpty()
        .withMessage('El precio es requerido')
        .isNumeric()
        .withMessage('El precio debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El precio no puede ser negativo');
            return true;
        }),

    body('stock')
        .notEmpty()
        .withMessage('El stock es requerido')
        .isNumeric()
        .withMessage('El stock debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El stock no puede ser negativo');
            return true;
        }),

    body('categoria')
        .notEmpty()
        .withMessage('La categoría es requerida')
        .isString()
        .withMessage('La categoría debe ser texto'),

    body('marca')
        .notEmpty()
        .withMessage('La marca es requerida')
        .isString()
        .withMessage('La marca debe ser texto'),

    body('codigoProducto')
        .notEmpty()
        .withMessage('El código del producto es requerido')
        .isString()
        .withMessage('El código del producto debe ser texto')
        .custom((value, { req }) => {
            if (value.length === 0) throw new Error('El código del producto no puede estar vacío');
            return true;
        }),

    body('fechaFabricacion')
        .notEmpty()
        .withMessage('La fecha de fabricación es requerida')
        .isDate()
        .withMessage('La fecha de fabricación debe ser una fecha válida'),

    body('garantiaMeses')
        .notEmpty()
        .withMessage('La garantía en meses es requerida')
        .isNumeric()
        .withMessage('La garantía debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('La garantía no puede ser negativa');
            return true;
        }),

    body('peso')
        .notEmpty()
        .withMessage('El peso es requerido')
        .isNumeric()
        .withMessage('El peso debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El peso no puede ser negativo');
            return true;
        }),

    body('dimensiones')
        .optional()
        .isObject()
        .withMessage('Las dimensiones deben ser un objeto'),

    body('dimensiones.alto')
        .optional()
        .isNumeric()
        .withMessage('El alto debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El alto no puede ser negativo');
            return true;
        }),

    body('dimensiones.ancho')
        .optional()
        .isNumeric()
        .withMessage('El ancho debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El ancho no puede ser negativo');
            return true;
        }),

    body('dimensiones.profundidad')
        .optional()
        .isNumeric()
        .withMessage('La profundidad debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('La profundidad no puede ser negativa');
            return true;
        }),

    body('coloresDisponibles')
        .optional()
        .isArray()
        .withMessage('Colores disponibles debe ser un array de strings')
        .custom((arr) => arr.every(item => typeof item === 'string'))
        .withMessage('Todos los elementos deben ser strings'),

    body('etiquetas')
        .optional()
        .isArray()
        .withMessage('Las etiquetas deben ser un array de strings')
        .custom((arr) => arr.every(item => typeof item === 'string'))
        .withMessage('Todos los elementos deben ser strings'),

    body('imagenes')
        .optional()
        .isArray()
        .withMessage('Las imágenes deben ser un array de strings')
        .custom((arr) => arr.every(item => typeof item === 'string'))
        .withMessage('Todos los elementos deben ser strings'),

    body('esActivo')
        .notEmpty()
        .withMessage('El estado de activación es requerido')
        .isBoolean()
        .withMessage('El estado de activación debe ser un valor booleano'),

    validateResult
];


const updateProductValidations = [
    param('id')
        .notEmpty()
        .withMessage('El ID es requerido')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    body('nombre')
        .optional()
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('descripcion')
        .optional()
        .isString()
        .withMessage('La descripción debe ser texto'),

    body('precio')
        .optional()
        .isNumeric()
        .withMessage('El precio debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El precio no puede ser negativo');
            return true;
        }),

    body('stock')
        .optional()
        .isNumeric()
        .withMessage('El stock debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El stock no puede ser negativo');
            return true;
        }),

    body('categoria')
        .optional()
        .isString()
        .withMessage('La categoría debe ser texto'),

    body('marca')
        .optional()
        .isString()
        .withMessage('La marca debe ser texto'),

    body('codigoProducto')
        .optional()
        .isString()
        .withMessage('El código del producto debe ser texto'),

    body('fechaFabricacion')
        .optional()
        .isDate()
        .withMessage('La fecha de fabricación debe ser una fecha válida'),

    body('garantiaMeses')
        .optional()
        .isNumeric()
        .withMessage('La garantía debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('La garantía no puede ser negativa');
            return true;
        }),

    body('peso')
        .optional()
        .isNumeric()
        .withMessage('El peso debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El peso no puede ser negativo');
            return true;
        }),

    body('dimensiones')
        .optional()
        .isObject()
        .withMessage('Las dimensiones deben ser un objeto'),

    body('dimensiones.alto')
        .optional()
        .isNumeric()
        .withMessage('El alto debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El alto no puede ser negativo');
            return true;
        }),

    body('dimensiones.ancho')
        .optional()
        .isNumeric()
        .withMessage('El ancho debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El ancho no puede ser negativo');
            return true;
        }),

    body('dimensiones.profundidad')
        .optional()
        .isNumeric()
        .withMessage('La profundidad debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('La profundidad no puede ser negativa');
            return true;
        }),

    body('coloresDisponibles')
        .optional()
        .isArray()
        .withMessage('Colores disponibles debe ser un array de strings')
        .custom((arr) => arr.every(item => typeof item === 'string'))
        .withMessage('Todos los elementos deben ser strings'),

    body('etiquetas')
        .optional()
        .isArray()
        .withMessage('Las etiquetas deben ser un array de strings')
        .custom((arr) => arr.every(item => typeof item === 'string'))
        .withMessage('Todos los elementos deben ser strings'),

    body('imagenes')
        .optional()
        .isArray()
        .withMessage('Las imágenes deben ser un array de strings')
        .custom((arr) => arr.every(item => typeof item === 'string'))
        .withMessage('Todos los elementos deben ser strings'),

    body('esActivo')
        .optional()
        .isBoolean()
        .withMessage('El estado de activación debe ser un valor booleano'),

    validateResult
];

const getProductValidations = [
 
    validateResult
];

const getProductByIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

const deleteProductValidation = [
    param('id')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido'),
validateResult
]


module.exports = {
    createProductValidations,
    updateProductValidations,
    getProductValidations,
    getProductByIdValidation,
    deleteProductValidation
};
