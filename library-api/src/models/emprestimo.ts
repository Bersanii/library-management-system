import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { Usuario } from './usuario';
import { Exemplar } from './exemplar';

export class Emprestimo extends Model<
  InferAttributes<Emprestimo>,
  InferCreationAttributes<Emprestimo>
> {
  declare id: CreationOptional<number>;
  declare dataHoraEmprestimo: Date;
  declare prazoDevolucao: Date;
  declare dataHoraDevolucao: Date;
  declare cpf: string;
}

export const EmprestimoFactory = (sequelize: Sequelize) => {
  Emprestimo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dataHoraEmprestimo: DataTypes.DATE,
      prazoDevolucao: DataTypes.DATE,
      dataHoraDevolucao: DataTypes.DATE,
      cpf: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Emprestimo',
      tableName: 'emprestimos',
      timestamps: false
    }
  );

  Emprestimo.belongsTo(Usuario, { foreignKey: 'cpf' });
  Usuario.hasMany(Emprestimo, { foreignKey: 'cpf' });

  Emprestimo.belongsToMany(Exemplar, { through: 'emprestimo-exemplares' });
  Exemplar.belongsToMany(Emprestimo, { through: 'emprestimo-exemplares' });

  return Emprestimo;
};
