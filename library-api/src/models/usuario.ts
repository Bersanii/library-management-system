import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export enum TiposUsuario {
  Alu = 'Alu',
  Ser = 'Ser',
  Adm = 'Adm'
}

export class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {
  declare cpf: string;
  declare nome: string;
  declare endereco: string;
  declare dataNascimento: Date;
  declare contato?: string;
  declare tipo: TiposUsuario;
  declare senha: string;
}

export const UsuarioFactory = (sequelize: Sequelize) => {
  Usuario.init(
    {
      cpf: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      dataNascimento: DataTypes.DATE,
      contato: DataTypes.STRING,
      tipo: DataTypes.STRING,
      senha: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: false
    }
  );

  return Usuario;
};