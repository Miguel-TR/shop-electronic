const { check, validationResult  } = require('express-validator');
const db = require("../database/models");

const inputsValues = [
    check('nombre')
        .notEmpty().withMessage('Debes ingresar tu nombre')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    check('apellido')
        .notEmpty().withMessage('Debes ingresar tu apellido')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    check('email')
        .notEmpty().withMessage('Debes ingresar tu email')
        .isEmail().withMessage('Debes ingresar un correo electrónico válido')
        .custom(async (email) => {
            const user = await db.User.findOne({ where: { email } });
            if (user) {
                throw new Error('Este correo electrónico ya está registrado');
            }
            return true;
        }),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
        .matches(/[@$!%*?&]/).withMessage('La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &)'),
    check('passwordConfirmation')
        .notEmpty().withMessage('Debes confirmar tu contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('La contraseña no coincide');
            }
            return true;
        }),
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
        check('telefono')
            .notEmpty().withMessage('El número de teléfono es obligatorio')
            .isLength({ min: 8, max: 10 }).withMessage('El número de teléfono debe tener entre 8 y 10 dígitos')
];

const validationErrors = ( req, res, next ) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next()
    }

    res.render('register', {
        old: req.body,
        title: 'Crear Cuenta',
        errors: errors.mapped() 
    })
}
module.exports = { inputsValues, validationErrors }
