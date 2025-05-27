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
  declare sexo?: string;
  declare contato?: string;
  declare tipo: TiposUsuario;
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
      sexo: DataTypes.STRING,
      contato: DataTypes.STRING,
      tipo: DataTypes.STRING
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