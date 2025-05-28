import app from './app';
import { sequelize, Usuario } from './models';
import { TiposUsuario } from './models/usuario';

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})

// Garante que sempre existe um usuário adm criado
Usuario.afterSync(async () => {
  const existing = await Usuario.findByPk('00000000000');
  if (!existing) {
    await Usuario.create({
      cpf: '00000000000',
      nome: 'Admin',
      endereco: 'Central',
      dataNascimento: new Date('1970-01-01'),
      contato: 'admin@library.com',
      tipo: TiposUsuario.Adm,
      senha: '123'
    });
  }
})
