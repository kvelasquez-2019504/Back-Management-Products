import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { dbConnection } from './database.js';
import routesProduct from '../api/products/product.routes.js';

dotenv.config();
class Server{
    constructor(){
        this.app = express();
        this.port =process.env.PORT;

        //Paths routes
        this.pathsRoutes={
            "/":routesProduct
        }
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB  (){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan("dev"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    
    routes(){
        Object.entries(this.pathsRoutes).map(([path,routes])=>{
            this.app.use(path,routes)
        });
    }
}

export default Server;