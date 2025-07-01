import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Container, Button, Spinner, Row, Col, Table, Form, Modal } from "react-bootstrap";
import { formatDateInput, getStatusDesc } from "../utils/format";
import { toast, ToastContainer } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const EmprestimoForm = () => {
  const navigate = useNavigate();

  const [prazoDevolucao, setPrazoDevolucao] = useState("");
  const [cpf, setCpf] = useState("");

  const [selectedExemplares, setSelectedExemplares] = useState<any[]>([]);
  const [showExemplarModal, setShowExemplarModal] = useState(false);
  const [obraSearchKeyword, setObraSearchKeyword] = useState("");
  const [stage, setStage] = useState(1);
  const [obras, setObras] = useState<any[]>([]);
  const [obraTemp, setObraTemp] = useState<any>(null);
  const [exemplares, setExemplares] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchAvailableObras = async (search: string = "") => {
    if (search && search.length < 3) return;
    setLoading(true);
    
    try {
      const query = search ? `?q=${encodeURIComponent(search)}` : "";
      const response = await fetch(`${API_URL}/getObras${query}`);
      if (!response.ok) throw new Error("Erro ao buscar obras");
      const data = await response.json();
      setObras(data);
    } catch (err: any) {
      console.error("Failed to fetch obras:", err);
      toast.error("Não foi possível carregar as obras. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchAvailableObras(obraSearchKeyword);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [obraSearchKeyword]);

  const handleModal = () => {
    setStage(1);
    setExemplares([]);
    setShowExemplarModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!prazoDevolucao || !cpf || selectedExemplares.length === 0) {
      toast.error("Por favor, preencha todos os campos e selecione pelo menos um exemplar.");
      setSubmitting(false);
      return;
    }

    try {
      const emprestimoData = {
        prazoDevolucao,
        cpf,
        exemplares: selectedExemplares.map((ex) => ex.tombo), // Send only exemplar IDs
      };

      const response = await fetch(`${API_URL}/createEmprestimo`, {
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

      navigate("/"); // Redirect to home or loan list after successful submission
    } catch (err: any) {
      console.error("Failed to register loan:", err);
      toast.error(err.message || "Não foi possível registrar o empréstimo. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectObra = async (obra: any) => {
    setLoading(true);
    setObraTemp(obra);
    try {
      const response = await fetch(`${API_URL}/getObra/${obra.isbn}`);
      if (!response.ok) throw new Error("Erro ao buscar exemplares");
      const data = await response.json();
      setExemplares(data.exemplares);
      setStage(2);
    } catch (err: any) {
      console.error("Failed to fetch exemplars:", err);
      toast.error("Não foi possível carregar os exemplares. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExemplar = (exemplar: any) => {
    exemplar.obra = obraTemp; // adiciona uma cópia dos dados da obra pra usar na UI
    if (!selectedExemplares.some((ex) => ex.tombo === exemplar.tombo)) {
      setSelectedExemplares((prev) => [...prev, exemplar]);
    }
    setShowExemplarModal(false);
    setObraSearchKeyword("");
  };

  const handleRemoveExemplar = (exemplarId: number) => {
    setSelectedExemplares((prev) =>
      prev.filter((ex) => ex.id !== exemplarId)
    );
  };

  return (
    <>
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

        <h2>Registrar Novo Empréstimo</h2>
        <hr />

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPrazoDevolucao">
              <Form.Label>Prazo de Devolução</Form.Label>
              <Form.Control
                type="text"
                placeholder="dd/mm/aaaa"
                value={prazoDevolucao}
                onChange={(e) => setPrazoDevolucao(formatDateInput(e.target.value))}
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
              onClick={() => handleModal()}
            >
              Adicionar Exemplar
            </Button>

            {selectedExemplares.length > 0 ? (
              <Table bordered className="mt-3">
                <thead>
                  <tr>
                    <th>Obra</th>
                    <th>Tombo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedExemplares.map((exemplar) => (
                    <tr key={exemplar.tombo}>
                      <td>{exemplar.obra?.titulo || "N/A"}</td>
                      <td>{exemplar.tombo}</td>
                      <td>
                        <Button
                          variant="link"
                          className="text-danger p-0 text-decoration-none"
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
            className="mt-3 text-white"
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
          {stage == 1 ? (
            <Modal.Body>
              <Form.Control
                type="text"
                placeholder="Buscar por ID, título da obra..."
                value={obraSearchKeyword}
                onChange={(e) => setObraSearchKeyword(e.target.value)}
                className="mb-3"
              />
              {obras.length > 0 ? (
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th>ISBN</th>
                      <th>Título da Obra</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {obras.map((obra: any) => (
                      <tr key={obra.isbn}>
                        <td>{obra.isbn}</td>
                        <td>{obra.titulo}</td>
                        <td>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleSelectObra(obra)}
                          >
                            Selecionar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">
                  Nenhuma obra encontrada ou digite pelo menos 3 caracteres para buscar.
                </p>
              )}
            </Modal.Body>
          ) : (
            <Modal.Body>
              {exemplares.length > 0 ? (
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th>Tombo</th>
                      <th>Sessão</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {exemplares.map((exemplar: any) => (
                      <tr key={exemplar.tombo}>
                        <td>{exemplar.tombo}</td>
                        <td>{exemplar.sessao}</td>
                        <td>{getStatusDesc(exemplar.status)}</td>
                        <td>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleAddExemplar(exemplar)}
                            disabled={selectedExemplares.some(
                              (ex) => ex.tombo === exemplar.tombo
                            ) || exemplar.status == 'empr'}
                          >
                            Selecionar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">
                  Nenhum exemplar encontrado ou digite pelo menos 3 caracteres para buscar.
                </p>
              )}
            </Modal.Body>
          )}
          <Modal.Footer>
            {stage == 2 && (
              <Button variant="primary" className="text-white" onClick={() => setStage(1)}>
                Voltar
              </Button>
            )}
            <Button variant="secondary" onClick={() => setShowExemplarModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default EmprestimoForm;