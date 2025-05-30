import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Obra } from './obra';

export class Exemplar extends Model<
  InferAttributes<Exemplar>,
  InferCreationAttributes<Exemplar>
> {
  declare tombo: string;
  declare dataAquisicao: Date;
  declare sessao: string;
  declare status: string; // disp | empr
  declare isbn: string;
}

export const ExemplarFactory = (sequelize: Sequelize) => {
  Exemplar.init(
    {
      tombo: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      dataAquisicao: DataTypes.DATE,
      sessao: DataTypes.STRING,
      status: DataTypes.STRING,
      isbn: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Exemplar',
      tableName: 'exemplares',
      timestamps: false
    }
  );

  Exemplar.belongsTo(Obra, { foreignKey: 'isbn' });
  Obra.hasMany(Exemplar, { foreignKey: 'isbn' });

  return Exemplar;
};
