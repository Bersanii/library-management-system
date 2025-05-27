import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Usuario } from './usuario';

export class Servidor extends Model<
  InferAttributes<Servidor>,
  InferCreationAttributes<Servidor>
> {
  declare registro: string;
  declare departamento: string;
  declare cpf: string;
}

export const ServidorFactory = (sequelize: Sequelize) => {
  Servidor.init(
    {
      registro: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      departamento: DataTypes.STRING,
      cpf: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Servidor',
      tableName: 'servidores',
      timestamps: false
    }
  );

  Servidor.belongsTo(Usuario, { foreignKey: 'cpf', onDelete: 'CASCADE' });
  Usuario.hasOne(Servidor, { foreignKey: 'cpf' });

  return Servidor;
};
