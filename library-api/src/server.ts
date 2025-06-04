import app from './app';
import { sequelize, Usuario, Obra, Exemplar } from './models';
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
    await Usuario.create({ cpf: '00000000000', nome: 'Admin', endereco: 'Central', dataNascimento: new Date('1970-01-01'), contato: 'admin@library.com', tipo: TiposUsuario.Adm, senha: '123'});
    console.log('Usuário admin criado.');
  }
});

// Garante que existem algumas obras cadastradas
Obra.afterSync(async () => {
  const count = await Obra.count();
  if (count === 0) {
    await Obra.bulkCreate([
      { isbn: "978-3-16-148410-0", titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", editora: "HarperCollins", paginas: 1216, linkCapa: "https://m.media-amazon.com/images/I/81hCVEC0ExL._UF894,1000_QL80_.jpg", descricao: "Uma das maiores obras de fantasia de todos os tempos, 'O Senhor dos Anéis' transporta o leitor para a Terra Média, onde elfos, anões, hobbits e humanos se unem contra as forças sombrias de Sauron. Com um mundo ricamente detalhado, personagens memoráveis e uma jornada heroica liderada pelo hobbit Frodo Bolseiro, esta saga épica trata de coragem, amizade, sacrifício e da eterna luta entre o bem e o mal." },
      { isbn: "978-0-7432-7356-5", titulo: "O Código Da Vinci", autor: "Dan Brown", editora: "Arqueiro", paginas: 480, linkCapa: "https://m.media-amazon.com/images/I/91QSDmqQdaL._AC_UF1000,1000_QL80_.jpg", descricao: "Um thriller intelectual repleto de mistérios históricos e simbolismos religiosos, onde o simbologista Robert Langdon e a criptóloga Sophie Neveu desvendam um assassinato no Louvre. Suas descobertas os levam por uma corrida frenética por Paris e Londres, revelando segredos há muito escondidos pela Igreja e pela história da humanidade." },
      { isbn: "978-0-141-03435-8", titulo: "1984", autor: "George Orwell", editora: "Companhia das Letras", paginas: 352, linkCapa: "https://m.media-amazon.com/images/I/61t0bwt1s3L._AC_UF1000,1000_QL80_.jpg", descricao: "Nesta distopia assustadoramente profética, Orwell descreve um futuro onde o totalitarismo domina completamente a sociedade. O protagonista Winston Smith vive sob constante vigilância do Grande Irmão, onde qualquer pensamento subversivo pode levá-lo à destruição. Uma obra poderosa sobre liberdade, manipulação da verdade e resistência silenciosa." },
      { isbn: "978-0-316-76948-0", titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", editora: "Intrínseca", paginas: 480, linkCapa: "https://m.media-amazon.com/images/I/61L+4OBhm-L.jpg", descricao: "Narrada pela Morte, essa história comovente se passa na Alemanha nazista e acompanha Liesel Meminger, uma jovem que encontra refúgio nos livros em meio à guerra. Com o poder das palavras, ela transforma a vida das pessoas ao seu redor, mesmo diante da tragédia iminente que cerca sua realidade." },
      { isbn: "978-0-06-112008-4", titulo: "O Sol é Para Todos", autor: "Harper Lee", editora: "José Olympio", paginas: 376, linkCapa: "https://m.media-amazon.com/images/I/91WKPd60P4L._AC_UF1000,1000_QL80_.jpg", descricao: "Ambientado no sul dos EUA na década de 1930, este clássico retrata o racismo institucional por meio da visão inocente de Scout Finch. Seu pai, o advogado Atticus Finch, defende um homem negro injustamente acusado de estupro, enfrentando o preconceito e a intolerância de sua comunidade." },
      { isbn: "978-0-452-28423-4", titulo: "O Apanhador no Campo de Centeio", autor: "J.D. Salinger", editora: "Editora do Autor", paginas: 288, linkCapa: "https://m.media-amazon.com/images/I/71b3GDZMzSL.jpg", descricao: "Através dos olhos de Holden Caulfield, um adolescente rebelde e introspectivo, o leitor mergulha nas angústias e nas contradições do amadurecimento. O romance aborda temas como alienação, hipocrisia social e o medo de crescer em um mundo adulto que parece desprovido de autenticidade." },
      { isbn: "978-0-7432-7355-8", titulo: "Anjos e Demônios", autor: "Dan Brown", editora: "Sextante", paginas: 496, linkCapa: "https://m.media-amazon.com/images/I/81SlD07DNZL.jpg", descricao: "Nesta eletrizante introdução ao simbologista Robert Langdon, ele se vê envolvido em um mistério mortal que envolve a antiga irmandade Illuminati. Combinando ciência, religião e arte renascentista, a trama se desenrola numa frenética corrida contra o tempo pelos túneis e igrejas de Roma." },
      { isbn: "978-0-553-21311-7", titulo: "A Guerra dos Tronos", autor: "George R.R. Martin", editora: "Leya", paginas: 592, linkCapa: "https://m.media-amazon.com/images/I/91+1SUO3vUL.jpg", descricao: "O primeiro livro da série 'As Crônicas de Gelo e Fogo' apresenta um mundo brutal e politicamente complexo, onde clãs nobres lutam por poder, enquanto ameaças sobrenaturais se aproximam do Norte. Intrigas, batalhas épicas e personagens moralmente ambíguos tornam esta obra um marco da fantasia moderna." },
      { isbn: "978-0-141-43972-5", titulo: "Admirável Mundo Novo", autor: "Aldous Huxley", editora: "Globo Livros", paginas: 320, linkCapa: "https://m.media-amazon.com/images/I/61hOp6UFvCL.jpg", descricao: "Nesta crítica à sociedade moderna e ao consumismo desenfreado, Huxley descreve um futuro onde os seres humanos são condicionados desde o nascimento para obedecer cegamente às regras sociais. Liberdade, individualidade e emoções profundas foram sacrificadas em nome da estabilidade e da ordem." },
      { isbn: "978-0-316-76947-3", titulo: "A Culpa é das Estrelas", autor: "John Green", editora: "Intrínseca", paginas: 313, linkCapa: "https://m.media-amazon.com/images/I/51M9IbBqxCL._AC_UF1000,1000_QL80_.jpg", descricao: "Hazel Grace e Augustus Waters são adolescentes que compartilham um amor intenso em meio à dura realidade do câncer. Com humor e emoção, o livro aborda a fragilidade da vida, a força dos vínculos humanos e o desejo de deixar uma marca no mundo, mesmo quando o tempo parece escasso." },
      { isbn: "978-0-7432-7357-2", titulo: "Inferno", autor: "Dan Brown", editora: "Arqueiro", paginas: 448, linkCapa: "https://m.media-amazon.com/images/I/91LZigHV56L._AC_UF1000,1000_QL80_.jpg", descricao: "Mais uma vez, Robert Langdon se vê envolvido em uma trama que mescla arte, literatura e enigmas históricos. Inspirado na obra de Dante Alighieri, Langdon precisa decifrar pistas espalhadas por Florença e Veneza para deter uma ameaça que pode causar um desastre global." },
      { isbn: "978-85-359-0277-2", titulo: "Dom Casmurro", autor: "Machado de Assis", editora: "Ática", paginas: 256, linkCapa: "https://m.media-amazon.com/images/I/61Z2bMhGicL.jpg", descricao: "Nesta obra-prima da literatura brasileira, o narrador Bentinho relata sua história de amor com Capitu, marcada por ciúmes e dúvidas. O romance é famoso por seu narrador não confiável, que deixa ao leitor o julgamento sobre a fidelidade da personagem feminina, tornando o livro eterno motivo de debate." },
      { isbn: "978-85-7522-250-0", titulo: "Capitães da Areia", autor: "Jorge Amado", editora: "Companhia das Letras", paginas: 272, linkCapa: "https://m.media-amazon.com/images/I/81t7altQZxL.jpg", descricao: "Um retrato vívido e sensível da infância marginalizada nas ruas de Salvador. Jorge Amado narra a saga de meninos que vivem entre a criminalidade e a esperança, revelando as injustiças sociais e a força da solidariedade entre os desamparados. Uma denúncia poética da desigualdade e da luta por dignidade."}
    ]);

    console.log('Obras iniciais inseridas.');
  }
});

// Garante que existam alguns exemplares cadastrados
Exemplar.afterSync(async () => {
  const count = await Exemplar.count();
  if (count === 0) {
    const obras = await Obra.findAll();

    const exemplares = obras.flatMap((obra, index) => {
      const quantidadeExemplares = Math.floor(Math.random() * 3) + 1; // entre 1 e 3 exemplares por obra

      return Array.from({ length: quantidadeExemplares }, (_, i) => ({
        // tombo: `T${index + 1}-${i + 1}`,
        dataAquisicao: new Date(2022, 0, 1 + i),
        sessao: ['A1-P3-5', 'A2-P1-8', 'B2-P8-2', 'C3-P1-5'][index % 4],
        status: 'disp',
        isbn: obra.isbn
      }));
    });

    await Exemplar.bulkCreate(exemplares);
    console.log('Exemplares iniciais inseridos.');
  }
});
