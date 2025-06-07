import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Container, Button, Spinner, Row, Col, Table, Form } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

const Emprestimo = () => {
  const { isbn } = useParams();
  const [emprestimos, setEmprestimos] = useState<any>([]);
  const [keyword, setKeyword] = useState('');

  const fetchemprestimos = async (search: string = '') => {
    if (search && search.length < 3) return;

    try {
      const query = search ? `?q=${encodeURIComponent(search)}` : '';
      const response = await fetch(`${API_URL}/getEmprestimos${query}`);
      if (!response.ok) throw new Error("Erro ao buscar obra");
      const data = await response.json();

      setEmprestimos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchemprestimos();
  }, [isbn]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchemprestimos(keyword);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  return (
    <Container className="mt-3">
      <Button as={Link as any} to="/" variant="link" className="text-primary text-decoration-none p-0 mb-3">
        <i className="bi bi-arrow-left me-2" />Voltar para o catálogo
      </Button>

      <Form.Control
        type="text"
        className="ms-2"
        placeholder="Buscar por cpf..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Table hover>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Titulo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo: any) => (
            <tr>
              <td>{emprestimo?.isbn}</td>
              <td>{emprestimo?.titulo}</td>
              <td style={{ alignItems: 'end' }}>
                <Button as={Link as any} to="/" variant="link" className="text-primary text-decoration-none p-0">
                  <i className="bi bi-x" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Emprestimo;
