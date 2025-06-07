import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Container, Button, Spinner, Row, Col, Table, Form, Modal } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

const EmprestimoForm = () => {
  const navigate = useNavigate();

  const [prazoDevolucao, setPrazoDevolucao] = useState("");
  const [cpf, setCpf] = useState("");

  const [selectedExemplares, setSelectedExemplares] = useState<any[]>([]);
  const [showExemplarModal, setShowExemplarModal] = useState(false);
  const [exemplarSearchKeyword, setExemplarSearchKeyword] = useState("");
  const [exemplares, setExemplares] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailableExemplares = async (search: string = "") => {
    if (search && search.length < 3) return;
    setLoading(true);
    setError(null);
    try {
      const query = search ? `?q=${encodeURIComponent(search)}` : "";
      const response = await fetch(`${API_URL}/getObras${query}`);
      if (!response.ok) throw new Error("Erro ao buscar exemplares");
      const data = await response.json();
      // adiciona o campo exemplares que é preenchido quando necessário
      setExemplares(data);
    } catch (err: any) {
      console.error("Failed to fetch exemplars:", err);
      setError("Não foi possível carregar os exemplares. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchAvailableExemplares(exemplarSearchKeyword);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [exemplarSearchKeyword]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!prazoDevolucao || !cpf || selectedExemplares.length === 0) {
      setError("Por favor, preencha todos os campos e selecione pelo menos um exemplar.");
      setSubmitting(false);
      return;
    }

    try {
      const emprestimoData = {
        prazoDevolucao,
        cpf,
        exemplares: selectedExemplares.map((ex) => ex.id), // Send only exemplar IDs
      };

      const response = await fetch(`${API_URL}/emprestimos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emprestimoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao registrar empréstimo");
      }

      alert("Empréstimo registrado com sucesso!");
      navigate("/"); // Redirect to home or loan list after successful submission
    } catch (err: any) {
      console.error("Failed to register loan:", err);
      setError(err.message || "Não foi possível registrar o empréstimo. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };


  const handleAddExemplar = (exemplar: any) => {
    if (!selectedExemplares.some((ex) => ex.id === exemplar.id)) {
      setSelectedExemplares((prev) => [...prev, exemplar]);
    }
    setShowExemplarModal(false);
    setExemplarSearchKeyword("");
    setExemplares([]);
  };

  const handleRemoveExemplar = (exemplarId: number) => {
    setSelectedExemplares((prev) =>
      prev.filter((ex) => ex.id !== exemplarId)
    );
  };

  return (
    <Container className="mt-3">
      <Button
        as={Link as any}
        to="/"
        variant="link"
        className="text-primary text-decoration-none p-0 mb-3"
      >
        <i className="bi bi-arrow-left me-2" />
        Voltar para o catálogo
      </Button>

      <h2 className="mb-4">Registrar Novo Empréstimo</h2>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPrazoDevolucao">
            <Form.Label>Prazo de Devolução</Form.Label>
            <Form.Control
              type="date"
              value={prazoDevolucao}
              onChange={(e) => setPrazoDevolucao(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formCpf">
            <Form.Label>CPF do Cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Exemplares Selecionados</Form.Label>
          <Button
            variant="outline-primary"
            className="ms-3"
            onClick={() => setShowExemplarModal(true)}
          >
            Adicionar Exemplar
          </Button>

          {selectedExemplares.length > 0 ? (
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th>ID Exemplar</th>
                  <th>Título da Obra</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {selectedExemplares.map((exemplar) => (
                  <tr key={exemplar.id}>
                    <td>{exemplar.id}</td>
                    <td>{exemplar.tituloObra || "N/A"}</td>{" "}
                    {/* Assuming exemplar has a title */}
                    <td>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleRemoveExemplar(exemplar.id)}
                      >
                        <i className="bi bi-x-circle" /> Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="mt-2 text-muted">Nenhum exemplar selecionado.</p>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Registrando...
            </>
          ) : (
            "Registrar Empréstimo"
          )}
        </Button>
      </Form>


      <Modal show={showExemplarModal} onHide={() => setShowExemplarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Selecionar Exemplares</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Buscar por ID, título da obra..."
            value={exemplarSearchKeyword}
            onChange={(e) => setExemplarSearchKeyword(e.target.value)}
            className="mb-3"
          />
          {exemplares.length > 0 ? (
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Título da Obra</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {exemplares.map((exemplar: any) => (
                  <>
                    <tr key={exemplar.isbn}>
                      <td>{exemplar.isbn}</td>
                      <td>{exemplar.titulo}</td>
                      {/* Adjust 'titulo' if your exemplar object has a different property for the title */}
                      <td>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleAddExemplar(exemplar)}
                          disabled={selectedExemplares.some(
                            (ex) => ex.id === exemplar.id
                          )}
                        >
                          Selecionar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                        
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted">
              Nenhum exemplar encontrado ou digite pelo menos 3 caracteres para buscar.
            </p>
          )}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExemplarModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmprestimoForm;