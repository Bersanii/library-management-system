import { Request, Response } from 'express';
import { sequelize } from '../models';
import { Emprestimo, Usuario, Exemplar } from '../models';

export async function getEmprestimos(_req: Request, res: Response) {
  try {
    const whereClause = _req.query.q
      ? { cpf: _req.query.q as string }
      : undefined;

    const emprestimos = await Emprestimo.findAll({
      where: whereClause,
      include: [
        {
          model: Exemplar,
          through: { attributes: [] }, // remove dados do modelo intermediário
        },
      ],
    });

    res.json(emprestimos);
  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    res.status(500).json({ error: 'Erro ao buscar empréstimos' });
  }
}

export async function createEmprestimo(_req: Request, res: Response) {
  try {
    console.log(_req.body);
    const { prazoDevolucao, cpf, exemplares } = _req.body;
    
    const [day, month, year] = prazoDevolucao.split('/').map(Number);
    const parsedPrazoDevolucao = new Date(year, month - 1, day); 
    
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

export async function devolverEmprestimo(_req: Request, res: Response) {
  try {
    const { emprestimoId, tombos } = _req.body; // tombos = array de números

    if (!emprestimoId || !Array.isArray(tombos)) {
      res.status(400).json({ message: 'Parâmetros inválidos.' });
      return;
    }

    const emprestimo = await Emprestimo.findByPk(emprestimoId);
    if (!emprestimo) {
      res.status(404).json({ message: 'Empréstimo não encontrado.' });
      return;
    }

    const joinModel = sequelize.model('emprestimo-exemplares');
    if (!joinModel) {
      res.status(500).json({ message: 'Tabela de associação não encontrada.' });
      return;
    }

    const exemplaresDevolvidos: number[] = [];

    for (const tombo of tombos) {
      const exemplar = await Exemplar.findByPk(tombo);
      if (!exemplar) {
        console.warn(`Exemplar ${tombo} não encontrado.`);
        continue;
      }

      // Atualiza o status para "disponível"
      exemplar.status = 'disp';
      await exemplar.save();

      // Remove a associação do empréstimo
      await joinModel.destroy({
        where: {
          EmprestimoId: emprestimo.id,
          ExemplarTombo: exemplar.tombo,
        },
      });

      exemplaresDevolvidos.push(tombo);
    }

    // Se todos os exemplares foram devolvidos, define a data de devolução
    const exemplaresRestantes = await emprestimo.getExemplars();
    if (exemplaresRestantes.length === 0 && !emprestimo.dataHoraDevolucao) {
      emprestimo.dataHoraDevolucao = new Date();
      await emprestimo.save();
    }

    res.status(200).json({
      message: 'Devolução processada com sucesso.',
      devolvidos: exemplaresDevolvidos,
      emprestimoId: emprestimo.id,
    });
  } catch (error) {
    console.error('Erro na devolução:', error);
    res.status(500).json({ message: 'Erro ao processar devolução.', error });
  }
}