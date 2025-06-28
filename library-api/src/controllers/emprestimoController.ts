import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Emprestimo, Usuario, Exemplar } from '../models';

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

export async function createEmprestimo(_req: Request, res: Response) {
  try {
    console.log(_req.body);
    const { prazoDevolucao, cpf, exemplares } = _req.body;
    
    const [day, month, year] = prazoDevolucao.split('/').map(Number);
    const parsedPrazoDevolucao = new Date(year, month - 1, day); // Month is 0-indexed in Date constructor

    // valida cpf
    const usuario = await Usuario.findOne({where: {cpf}})
    if(usuario == null){
      res.status(404).json({ message: 'CPF não encontrado' });
      return;
    }

    const emprestimo = await Emprestimo.create({
      dataHoraEmprestimo: new Date(),
      prazoDevolucao: parsedPrazoDevolucao,
      cpf: cpf
    });

    const updatedExemplares = await Promise.all(exemplares.map(async (tombo: number) => {
        const exemplar = await Exemplar.findByPk(tombo);
        if (exemplar) {
          exemplar.status = 'empr';
          await exemplar.save();
          return exemplar;
        }
        return null;
      }));

    await emprestimo.addExemplars(updatedExemplares);

    res.status(201).json({ message: 'Empréstimo cadastrado com sucesso', emprestimo });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao cadastrar emprestimo' });
  }
}