import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const DashboardSer = () => {
  const [obras, setObras] = useState([]);
  const [keyword, setKeyword] = useState('');

  // Cadastro de obra
  const [isbn, setIsbn] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [paginas, setPaginas] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkCapa, setLinkCapa] = useState('');
  const [qtdExemplares, setQtdExemplares] = useState('');
  const [sessao, setSessao] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!isbn || ! titulo || !autor || !editora || !paginas || !descricao){
      toast.error('Preencha todos os campos');
      return;
    }

    const formData = {
      isbn, titulo, autor, editora, paginas, descricao, linkCapa, qtdExemplares, sessao
    };

    try {
      await fetch(`${API_URL}/createObra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      toast.success('Cadastro efetuado com sucesso.');
      clearForm();
      fetchObras();

    } catch (err) {
      console.error(err);
      toast.error('Erro ao efetuar o cadastro.');
    }
  }

   async function handleDeleteObra(obra: any) {
      const confirm = window.confirm(`Deseja realmente excluir a obra ${obra.titulo}?`);
      if (!confirm) return;
  
      try {
        const response = await fetch(`${API_URL}/deleteObra/${obra.isbn}`, {
          method: 'POST',
        });
  
        if (!response.ok) throw new Error();
  
        toast.success('Obra excluída com sucesso.');
        fetchObras(); // Atualiza a lista
      } catch (err) {
        console.error(err);
        toast.error('Erro ao excluir obra.');
      }
    }

  function clearForm(){
    setIsbn('');
    setTitulo('');
    setAutor('');
    setEditora('');
    setPaginas('');
    setDescricao('');
    setLinkCapa('');
    setQtdExemplares('');
    setSessao('');
  }

  async function fetchObras(search: string = '') {
    if (search && search.length < 3) return;

    try {
      const query = search ? `?q=${encodeURIComponent(search)}` : '';
      const response = await fetch(`${API_URL}/getObras${query}`);
      if (!response.ok) throw new Error("Erro ao buscar obras");
      const data = await response.json();
      setObras(data);
    } catch (err) {
      console.error(err);
      toast.error('Erro buscar obras.');
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
    <>
      <Container className="mt-3">

        <Button as={Link as any} to="/" variant="link" className="text-primary text-decoration-none p-0 mb-2">
          <i className="bi bi-arrow-left me-2" />Voltar para o catálogo
        </Button>
        <h2>Gerenciamento</h2>
        <hr />

        <Row>
          <Col sm={12} lg={6}>
            <div className="d-flex align-items-center justify-content-between">
              <h4>Obras</h4>
              <Form.Control
                type="text"
                className="ms-2"
                placeholder="Buscar por título, autor, editora..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Table hover>
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Titulo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {obras.map((obra: any) => (
                  <tr>
                    <td>{obra?.isbn}</td>
                    <td>{obra?.titulo}</td>
                    <td style={{ alignItems: 'end' }}>
                      <Button as={Link as any} to={{ pathname: `/obra/${obra.isbn}` }} variant="link" className="text-primary text-decoration-none p-0">
                        <i className="bi bi-box-arrow-up-right me-2" />
                      </Button>
                      <Button onClick={() => handleDeleteObra(obra)} variant="link" className="text-primary text-decoration-none p-0">
                        <i className="bi bi-x" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm={12} lg={6}>
            <div className="d-flex align-items-center justify-content-between">
              <h4>Cadastro de obras</h4>
            </div>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="isbn">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="titulo">
                  <Form.Label>Título</Form.Label>
                  <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} className="mb-3" controlId="autor">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="editora">
                  <Form.Label>Editora</Form.Label>
                  <Form.Control type="text" value={editora} onChange={(e) => setEditora(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="editora">
                  <Form.Label>Imagem de Capa</Form.Label>
                  <Form.Control type="text" value={linkCapa} onChange={(e) => setLinkCapa(e.target.value)} />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="paginas">
                <Form.Label>Páginas</Form.Label>
                <Form.Control type="number" value={paginas} onChange={(e) => setPaginas(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="descricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
              </Form.Group>

              <h5>Exemplares</h5>
              <Row>
                <Form.Group as={Col} controlId="autor" className="mb-3">
                  <Form.Label>Sessão</Form.Label>
                  <Form.Control type="text" value={sessao} onChange={(e) => setSessao(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="editora" className="mb-3">
                  <Form.Label>Exemplares</Form.Label>
                  <Form.Control type="number" value={qtdExemplares} onChange={(e) => setQtdExemplares(e.target.value)} />
                </Form.Group>
              </Row>

              <div className="w-100 d-flex justify-content-end mb-3">
                <Button variant="primary" type="submit" className="text-white">
                  Cadastrar Obra e Exemplares
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default DashboardSer;