const User = require('../models/user');

const isAlreadyRegister = async ( email ) => {
    const isDuplicated = await User.findOne({email});
    if( isDuplicated ){
        throw new Error("Email already register")
    }
}


module.exports = {
    isAlreadyRegister,
}
