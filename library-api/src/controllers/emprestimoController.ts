import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Emprestimo } from '../models';

export async function getEmprestimos(_req: Request, res: Response) {
  try {
    let emprestimos;
    if (_req.query.q) {
      emprestimos = await Emprestimo.findAll({
        where: {
          cpf: _req.query.q as string
        },
      });
    } else {
      emprestimos = await Emprestimo.findAll();
    }

    res.json(emprestimos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar emprestimos' });
  }
}