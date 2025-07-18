import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Obra, Exemplar } from '../models';

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

    if(obra == null)
      res.status(404);

    const exemplares = await Exemplar.findAll({
      where: {
        isbn: obra?.isbn
      }
    })

    res.json({
      obra,
      exemplares
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar obra' });
  }
}

export async function createObra(_req: Request, res: Response) {
  const { isbn, titulo, autor, editora, paginas, descricao, linkCapa, qtdExemplares, sessao } = _req.body;

  try {
    await Obra.create({isbn, titulo, autor, editora, paginas, descricao, linkCapa})

    for(let i = 0; i < qtdExemplares; i++) {
      await Exemplar.create({
        isbn,
        status: 'disp',
        dataAquisicao: new Date(),
        sessao,
      });
    };

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar obra' });
  }
}

export async function deleteObra(_req: Request, res: Response) {
  const { isbn } = _req.params;

  try {
    const obra = await Obra.findByPk(isbn);

    if (!obra) {
      res.status(404).json({ error: 'Obra não encontrado' });
      return;
    }

    // Deleta todos os exemplares relacionados à obra
    await Exemplar.destroy({ where: { isbn } });

    await Obra.destroy({ where: { isbn } });

    res.json({ message: 'Obra deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar obra' });
  }
}