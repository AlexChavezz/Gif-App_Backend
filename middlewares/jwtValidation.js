const User = require('../models/user');
const jwt = require('jsonwebtoken');


const jwtValidation = async (req, res, next) => {
    const token = req.header('x-token');
    console.log(token)
    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        if (!token) {
            return res.status(401).json({
                msg: "Thers' not token"
            });
        }
        console.log(typeof Date.now())
        const user = await User.findById(uid)
        if (!user) {
            return res.status(401).json({
                msg: "Token no valido"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                msg: "token expired",
            })
        } else {
            return res.status(500).json({
                msg: "Internal server error",
                error,
            })
        }
    }
}

module.exports = jwtValidation;