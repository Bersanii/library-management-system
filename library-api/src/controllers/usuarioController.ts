import { Request, Response } from 'express';
import { Usuario } from '../models';
import { TiposUsuario } from '../models/usuario';

export async function getUsuario(_req: Request, res: Response) {
  try {
    const users = await Usuario.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function createUsuario(req: Request, res: Response) {
  try {
    const { cpf, nome, endereco, dataNascimento, sexo, contato } = req.body;
    const user = await Usuario.create({
      cpf,
      nome,
      endereco,
      dataNascimento: new Date(1990, 1, 1),
      contato,
      tipo: TiposUsuario.Adm,
      senha: '123'
    });
    res.status(201).json({
      message: 'User created',
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}
