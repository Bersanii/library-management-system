import { Sequelize } from 'sequelize';

import { UsuarioFactory, Usuario } from './usuario';
import { AlunoFactory, Aluno } from './aluno';
import { ServidorFactory, Servidor } from './servidor';
import { ObraFactory, Obra } from './obra';
import { ExemplarFactory, Exemplar } from './exemplar';
import { EmprestimoFactory, Emprestimo } from './emprestimo';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './library.sqlite',
  logging: false
});

UsuarioFactory(sequelize);
AlunoFactory(sequelize);
ServidorFactory(sequelize);
ObraFactory(sequelize);
ExemplarFactory(sequelize);
EmprestimoFactory(sequelize);

export {
  sequelize,
  Usuario,
  Aluno,
  Servidor,
  Obra,
  Exemplar,
  Emprestimo
};
