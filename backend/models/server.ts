import express, { Application } from "express";
import cors from "cors";
import userRoutes from "../routes/usuarios";
import authRoutes from "../routes/auth";
import authorsRoutes from "../routes/authors";
import booksRoutes from "../routes/books";
import { dbConnection } from "../database/config";


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/usuarios',
        books: '/api/books',
        authors: '/api/authors'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.conectarDB();
        this.middlewares();
        this.routes();
    };

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());//configuracion del cors
        this.app.use(express.json());//leer el body
    };

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.authors, authorsRoutes)
        this.app.use(this.apiPaths.books, booksRoutes)
        this.app.use(this.apiPaths.usuarios, userRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor Online en el puerto: '+ this.port);
        });
    };

}

export default Server;