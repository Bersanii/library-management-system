import express from 'express';
import { createUsuario, getUsuario, getUsuarios } from './controllers/usuarioController';
import { getObras, getObra } from './controllers/obraController';
import { login } from './controllers/authController';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.post('/api/login', login);

app.get('/api/usuario', getUsuario);
app.get('/api/usuarios', getUsuarios);
app.post('/api/usuario', createUsuario);

app.get('/api/getObras', getObras);
app.get('/api/getObra/:isbn', getObra);


export default app;
