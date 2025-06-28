import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional,
  NonAttribute,
  Association,
  HasManyAddAssociationsMixin,
  HasManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyAddAssociationMixin } from 'sequelize';
import { Usuario } from './usuario';
import { Exemplar } from './exemplar';

export class Emprestimo extends Model<
  InferAttributes<Emprestimo>,
  InferCreationAttributes<Emprestimo>
> {
  declare id: CreationOptional<number>;
  declare dataHoraEmprestimo: Date;
  declare prazoDevolucao: Date;
  declare dataHoraDevolucao: CreationOptional<Date>;
  declare cpf: string;

  declare addExemplar: BelongsToManyAddAssociationMixin<Exemplar, number>;
  declare addExemplars: BelongsToManyAddAssociationsMixin<Exemplar, number>;
  declare getExemplars: () => Promise<Exemplar[]>;
  declare setExemplars: (exemplares: Exemplar[]) => Promise<void>;
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
      dataHoraDevolucao: {
        type: DataTypes.DATE,
        allowNull: true
      },
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
