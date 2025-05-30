import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';

export class Obra extends Model<
  InferAttributes<Obra>,
  InferCreationAttributes<Obra>
> {
  declare isbn: string;
  declare titulo: string;
  declare autor: string;
  declare editora: string;
  declare paginas: number;
  declare descricao?: string;
  declare linkCapa?: string;
}

export const ObraFactory = (sequelize: Sequelize) => {
  Obra.init(
    {
      isbn: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      titulo: DataTypes.STRING,
      autor: DataTypes.STRING,
      editora: DataTypes.STRING,
      paginas: DataTypes.INTEGER,
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      linkCapa: {
        type: DataTypes.STRING,
        allowNull: true 
      }
    },
    {
      sequelize,
      modelName: 'Obra',
      tableName: 'obras',
      timestamps: false
    }
  );

  return Obra;
};
