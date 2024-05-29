const { check, validationResult  } = require('express-validator');
const db = require("../database/models");
const bcrypt = require('bcryptjs');

const inputsValuesLogin = [
    check('email')
        .notEmpty().withMessage('Debes ingresar tu email')
        .isEmail().withMessage('Debes ingresar un email válido')
        .custom(async value => {
            const user = await db.User.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('El email no se encuentra registrado');
            }
            return true;
        }),
    check('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña')
        .custom(async (value, { req }) => {
            const user = await db.User.findOne({ where: { email: req.body.email } });
            if (user) {
                const match = bcrypt.compareSync(value, user.password_user);
                if (!match) {
                    throw new Error('La contraseña no coincide.');
                }
            }
            return true;
        })
];

const validationErrorsLogin = ( req, res, next ) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next()
    }

    res.render('login', {
        old: req.body,
        title: 'Iniciar Sesion',
        errors: errors.mapped() 
    })
}
module.exports = { inputsValuesLogin, validationErrorsLogin }
