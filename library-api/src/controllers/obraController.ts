import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Obra } from '../models';

export async function getObras(_req: Request, res: Response) {
  try {
    let obras;
    if (_req.query.q) {
      obras = await Obra.findAll({
        where: {
          [Op.or]: [
            { isbn: { [Op.like]: `%${_req.query.q}%` } },
            { titulo: { [Op.like]: `%${_req.query.q}%` } },
            { autor: { [Op.like]: `%${_req.query.q}%` } },
            { editora: { [Op.like]: `%${_req.query.q}%` } },
          ]
        },
        order: [['titulo', 'ASC']]
      });
    } else {
      obras = await Obra.findAll({
        order: [['titulo', 'ASC']]
      });
    }

    res.json(obras);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar obras' });
  }
}

export async function getObra(_req: Request, res: Response) {
  const { isbn } = _req.params;
  try {
    const obra = await Obra.findOne({
      where: {
        isbn
      }
    });
    res.json(obra);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar obra' });
  }
}