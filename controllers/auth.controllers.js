const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const generateJwt = require('../helpers/generateJwt');
const jwt = require ('jsonwebtoken');

const register = async (req, res) => {

    const { name, email, password } = req.body;

    // -> Create new user 
    const user = new User({ name, email, password });
    // -> Password Crypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    // -> Save new user
    await user.save();
    // -> Get  jwt
    const jwt = await generateJwt(user.id);

    return res.json({
        user,
        jwt
    })

}

const login = async (req, res) => {

    const { email, password } = req.body;
    // console.log(req.body)
    try {
        // -> Get user 
        const user = await User.findOne({ email });
        // -> Is user exist
        if (!user) {
            return res.status(400).json({
                msg: 'Email or password are incorrect'
            })  
        }
        // Valid Password 
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                msg: 'Email or password are incorrect'
            })
        }
        // -> Gnerate jwt
        const jwt = await generateJwt(user.id);
        return res.status(200).json({
            user,
            jwt
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const validToken = (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
}

module.exports = {
    // getUser,
    register,
    login,
    validToken
}