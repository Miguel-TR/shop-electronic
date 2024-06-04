const { check} = require('express-validator');
const db = require("../database/models");

const validations = [
    check('title')
        .notEmpty().withMessage('Debes ingresar un titulo para el producto')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('Description')
        .notEmpty().withMessage('Debes ingresar una descripcion para el producto')
        .isLength({ min: 20 }).withMessage('La descripcion debe tener al menos 20 caracteres'),
    check('price').notEmpty().withMessage('Debes ingresar un precio base para el producto.'),
    check('discount').notEmpty().withMessage('Debes ingresar un descuento para el producto.'),
    check('warranty').notEmpty().withMessage('Debes ingresar una garantia para el producto.'),
    check('stock').notEmpty().withMessage('Debes seleccionar un stock para el producto.'),
    check('specifications').notEmpty().withMessage('Debes ingresar la especificación para el producto.'),
    check('category').notEmpty().withMessage('Debes seleccionar una categoria para el producto.'),
    check('brand').notEmpty().withMessage('Debes seleccionar una marca para el producto.'),
    check('img')
    .custom((value, { req }) => {
        if (!req.file) {
            return true;
        }
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExtension = require('path').extname(req.file.originalname).toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            throw new Error('La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF)');
        }
        return true;
    }),
];

module.exports = validations;


