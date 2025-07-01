import { Request, Response } from 'express';
import { Usuario, Aluno, Servidor } from '../models';
import { TiposUsuario } from '../models/usuario';

export async function getUsuario(_req: Request, res: Response) {
  try {
    const users = await Usuario.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function getUsuarios(_req: Request, res: Response) {
  const tipo = _req.query.tipo as TiposUsuario;
  try {
    let users;
    if (tipo) { 
      users = await Usuario.findAll({
        where: {
          tipo
        }
      });
    } else {
      users = await Usuario.findAll();
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function createUsuario(req: Request, res: Response) {
  try {
    const { cpf, nome, endereco, contato, senha, tipo, ra, curso, registro, departamento } = req.body;
    const user = await Usuario.create({
      cpf,
      nome,
      endereco,
      dataNascimento: new Date(1990, 1, 1),
      contato,
      senha,
      tipo,
    });

    if (tipo == 'Alu') {
      const aluno = await Aluno.create({
        cpf,
        ra,
        curso
      });
    }

    if (tipo == 'Ser') {
      const servidor = await Servidor.create({
        cpf,
        registro,
        departamento
      });
    }

    res.status(201).json({
      message: 'User created',
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function deleteUsuario(_req: Request, res: Response) {
  const { cpf } = _req.params;

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(cpf);

    if (!usuario) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Remove dados associados dependendo do tipo
    if (usuario.tipo === 'Alu') {
      await Aluno.destroy({ where: { cpf } });
    }

    if (usuario.tipo === 'Ser') {
      await Servidor.destroy({ where: { cpf } });
    }

    // Remove o usuário
    await Usuario.destroy({ where: { cpf } });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}

