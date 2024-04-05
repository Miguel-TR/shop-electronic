const { check, validationResult  } = require('express-validator');

const inputsValues = [
    check('nombre').notEmpty().withMessage('Debes ingresar tu nombre'),
    check('apellido').notEmpty().withMessage('Debes ingresar tu apellido'),
    check('email')
        .notEmpty().withMessage('Debes ingresar tu email')
        .isEmail().withMessage('Debes ingresar un correo electrónico válido'),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('passwordConfirmation')
        .notEmpty().withMessage('Debes confirmar tu contraseña')
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
