import { Request, Response } from 'express';
import { Usuario } from '../models';
import { TiposUsuario } from '../models/usuario';

export const login = async (req: Request, res: Response) => {
  try {
    const { cpf, senha } = req.body;
    const user = await Usuario.findOne({
      where: {
        cpf,
        senha
      }
    });

    if(user == null){
      res.status(404).json({ error: 'Failed to find user'});
      return;
    }

    res.status(200).json({user});
  } catch (error) {
    res.status(500);
  }
};
