const express = require('express');
const cors = require('cors');
const mongoDbConnecion = require('../db/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authRoute = '/api/auth';


        //-> Database 
        this.dbConnection();

        // -> Middlewares
        this.middlewares();

        // -> Routes
        this.routes();
    }
    async dbConnection (){
        await mongoDbConnecion();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.authRoute, require('../routes/auth.routes') );
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listen on port ${this.port}`)
        })
    }
}


module.exports = Server;