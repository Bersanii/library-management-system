import express from 'express';
import { createUser, getUsers } from './controllers/userController';
import { login } from './controllers/authController';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.post('/api/login', login)
;
app.post('/api/users', createUser);
app.post('/api/users', createUser);


export default app;
