import express, { Application } from "express";
import router from "./router";
import cors from "cors";

// -----------------------------------------------------------------------------

const app: Application = express();


//Se activa cors para permitir las peticiones desde front
app.use(cors());

// Middlewares
app.use(express.json());

// Rutas
app.use(router)


export default app;