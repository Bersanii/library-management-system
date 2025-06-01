import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [obras, setObras] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchObras = async (search: string = '') => {
    if (search && search.length < 3) return;

    try {
      const query = search ? `?q=${encodeURIComponent(search)}` : '';
      const response = await fetch(`${API_URL}/getObras${query}`);
      if (!response.ok) throw new Error("Erro ao buscar obras");
      const data = await response.json();
      setObras(data);
    } catch (err) {
      console.error(err);
      toast.error('Erro buscar livros.');
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchObras(keyword);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  return (
    <Container>
      <h2 className="my-3">Explore o Catálogo</h2>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar por título, autor, editora..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Form>

      { obras.length > 0 ? (
        <Row>
          {obras.map((obra: any) => (
            <Col key={obra.isbn} sm={12} md={6} lg={3} className='mb-4'>
              <Card style={{ width: '100%', height: '100%' }}>
                <Card.Img
                  variant='top'
                  style={{ aspectRatio: '0.75' }}
                  src={obra.linkCapa ?? 'https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png'}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{obra.titulo}</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    {obra.autor}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Editora:</strong> {obra.editora} <br />
                    <strong>ISBN:</strong> {obra.isbn}
                  </Card.Text>
                  <Button as={Link as any} to={`/obra/${obra.isbn}`} variant="primary" className="mt-auto text-white">
                    Ver detalhes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h5>Nenhum livro encontrado</h5>
      )}
    
      <ToastContainer />
    </Container>
  );
};

export default Home;
