import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Container, Button, Spinner, Row, Col, Table } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

const BookDetails = () => {
  const { isbn } = useParams();
  const [obra, setObra] = useState<any>(null);
  const [exemplares, setExemplares] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  function getStatusDesc(status: String){
    if(status == 'empr')
      return 'Emprestado';
    else
      return 'Disponível'
  }

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const response = await fetch(`${API_URL}/getObra/${isbn}`);
        if (!response.ok) throw new Error("Erro ao buscar obra");
        const data = await response.json();

        setObra(data?.obra);
        setExemplares(data?.exemplares);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchObra();
  }, [isbn]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!obra) {
    return (
      <Container className="text-center mt-5">
        <h3>Livro não encontrado</h3>
        <Button as={Link as any} to="/" variant="secondary" className="mt-3">
          Voltar
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      <Button as={Link as any} to="/" variant="primary" className="text-white mb-4">
        ← Voltar
      </Button>

      <Row>
        <Col sm={12} lg={3}>
          <img className="rounded" style={{ width: '100%' }} src={obra.linkCapa ?? 'https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png'}></img>
        </Col>
        <Col>
          <h3>{obra.titulo}</h3>
          <h4 className="mb-2 text-muted">{obra.autor}</h4>
          <p>
            <strong>Número de páginas:</strong> {obra.paginas}<br />
            <strong>Editora:</strong> {obra.editora}<br />
            <strong>ISBN:</strong> {obra.isbn}
          </p>
          <p style={{ fontSize: '14pt' }}>{obra.descricao}</p>
        </Col>
      </Row>

      <h4 className="mt-4 mb-0">Exemplares</h4>
      <p className="text-muted">Reservas devem ser efetuadas presencialmente com um bibliotecário.</p>
      {exemplares != null && exemplares.length > 0 ?
        <Table striped hover size='sm'>
          <thead>
            <tr>
              <th>Tombo</th>
              <th>Sessão</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exemplares.map((exemplar: any) => (
              <tr>
                <td className='text-capitalize'>{exemplar.tombo}</td>
                <td className='text-capitalize'>{exemplar.sessao}</td>
                <td className='text-capitalize'>{getStatusDesc(exemplar.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      : <h5>Nenhum exemplar para essa obra</h5>
      }
      
    </Container>
  );
};

export default BookDetails;
