const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        require:[ true, 'name is required']
    },
    password: {
        type: String,
        require: [true,'password is required']
    },
    email: {
        type: String, 
        require:['true', 'email is required'],
        unique: true
    }
})
userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    return {...user, uid: _id};
}

module.exports  = model('User', userSchema);