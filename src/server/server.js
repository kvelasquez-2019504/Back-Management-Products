
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { dbConnection } from './database.js';
import limiter from '../middlewares/apiLimiter.js'
import routesProduct from '../api/products/product.routes.js';

dotenv.config();

/**
 * Clase principal del servidor Express.
 * Configura middlewares, rutas, conexión a base de datos y arranque del servidor.
 */
class Server {
    constructor() {
        /**
         * Instancia de la aplicación Express
         */
        this.app = express();
        /**
         * Puerto en el que corre el servidor (definido en .env)
         */
        this.port = process.env.PORT;

        /**
         * Objeto con los paths y sus rutas asociadas
         * @type {Object<string, import('express').Router>}
         */
        this.pathsRoutes = {
            "/": routesProduct
        }
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    /**
     * Conecta a la base de datos MongoDB
     * @returns {Promise<void>}
     */
    async connectDB() {
        await dbConnection();
    }

    /**
     * Configura los middlewares globales de la app
     */
    middlewares() {
        // Permite parsear datos de formularios
        this.app.use(express.urlencoded({ extended: false }));
        // Permite parsear JSON en las peticiones
        this.app.use(express.json());
        // Seguridad HTTP headers
        this.app.use(helmet());
        // Permite solicitudes CORS solo desde el frontend en Vercel
        this.app.use(cors({
            origin: 'https://front-management-products.vercel.app'
        }));
        // Logger de peticiones HTTP
        this.app.use(morgan("dev"));
        // Limita la cantidad de peticiones por IP
        this.app.use(limiter);
    }

    /**
     * Inicia el servidor en el puerto configurado
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    /**
     * Configura las rutas principales de la aplicación
     */
    routes() {
        Object.entries(this.pathsRoutes).map(([path, routes]) => {
            this.app.use(path, routes)
        });
    }
}

export default Server;