import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Usuario } from './usuario';

export class Aluno extends Model<
  InferAttributes<Aluno>,
  InferCreationAttributes<Aluno>
> {
  declare ra: string;
  declare curso: string;
  declare cpf: string;
}

export const AlunoFactory = (sequelize: Sequelize) => {
  Aluno.init(
    {
      ra: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      curso: DataTypes.STRING,
      cpf: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Aluno',
      tableName: 'alunos',
      timestamps: false
    }
  );

  Aluno.belongsTo(Usuario, { foreignKey: 'cpf', onDelete: 'CASCADE' });
  Usuario.hasOne(Aluno, { foreignKey: 'cpf' });

  return Aluno;
};
