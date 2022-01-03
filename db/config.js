const mongoose = require('mongoose');

const mongoDbConnecion = () => {
    try{

        mongoose.connect(process.env.MONGO_DB)
        console.log('DataBase online')
    }catch(e){
        console.log(e);
        throw new Error('Database initialization error')
    }
}

module.exports = mongoDbConnecion;