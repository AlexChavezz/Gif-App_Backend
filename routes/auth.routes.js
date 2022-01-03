const { validToken, register, login } = require('../controllers/auth.controllers');
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { isAlreadyRegister, isJwtValid } = require('../helpers/usersValidations');
const jwtValidation = require('../middlewares/jwtValidation');

router.post('/register', [
    check('email', 'Email is require').isEmail(),
    check('name', 'Name is required').isLength({min:3}),
    check('password', 'Password should has min length 6' ).isLength({min:6}),
    check('email').custom( isAlreadyRegister ),
    validateFields
], register);

router.post('/login', [
    check('email','Email is require').isEmail(),
    check('password', 'Password should has min length 6').isLength({min:6}),
    validateFields
], login)


router.get('/validate', [
    jwtValidation,
    validateFields
] ,validToken)
module.exports = router;