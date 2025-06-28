import express from 'express';
import { createUsuario, getUsuario, getUsuarios } from './controllers/usuarioController';
import { getObras, getObra, createObra } from './controllers/obraController';
import { getEmprestimos, createEmprestimo, devolverEmprestimo } from './controllers/emprestimoController';
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
app.post('/api/createObra', createObra);

app.get('/api/getEmprestimos', getEmprestimos);
app.post('/api/createEmprestimo', createEmprestimo);
app.post('/api/devolverEmprestimo', devolverEmprestimo);


export default app;
