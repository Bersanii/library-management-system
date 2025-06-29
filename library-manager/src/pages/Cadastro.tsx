import { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth'

const API_URL = import.meta.env.VITE_API_URL

const Cadastro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [senha, setSenha] = useState("");
  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");
  const [registro, setRegistro] = useState("");
  const [departamento, setDepartamento] = useState("");

  const [searchParams] = useSearchParams();
  const tipo = searchParams.get('tipo') ?? 'Alu'; // Tipo padrão Aluno

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = {
      cpf,
      nome,
      endereco,
      contato,
      senha,
      ra,
      curso,
      registro,
      departamento,
      tipo
    };

    try {
      const response = await fetch(`${API_URL}/usuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success('Cadastro efetuado com sucesso.');

      // Se for um adm e acabou de cadastrar um Servidor redirecionar para dashboard
      if (tipo == 'Ser' && user && user.tipo == 'Adm')
        navigate("/dashboard-adm", { replace: true });
      else
        navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao efetuar o cadastro.');
    }
  }

  return (
    <Container fluid style={{ height: '100vh' }} className="background d-flex">
      <Card className="mx-auto my-auto rounded-4" style={{ maxWidth: '35vw' }}>
        <Card.Body className="p-5">
          <h2 className="mb-3">Cadastro</h2>
          <p className="mb-3">Preencha os dados para realizar o cadastro.</p>

          <Form onSubmit={handleSubmit}>
            <h5>Dados Pessoais</h5>
            <hr className="mt-0" />

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="endereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contato">
              <Form.Label>Contato</Form.Label>
              <Form.Control type="text" value={contato} onChange={(e) => setContato(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </Form.Group>

            {tipo == 'Alu' ?
              <>
                <h5>Dados do aluno</h5>
                <hr className="mt-0" />

                <Row>
                  <Form.Group as={Col} className="mb-3" controlId="ra">
                    <Form.Label>RA</Form.Label>
                    <Form.Control type="text" value={ra} onChange={(e) => setRa(e.target.value)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="curso">
                    <Form.Label>Curso</Form.Label>
                    <Form.Select className="mb-3" value={curso} onChange={(e) => setCurso(e.target.value)}>
                      <option value="">Selecione o curso</option>
                      <option value="Ciências da Computação">Ciências da Computação</option>
                      <option value="Geografia">Geografia</option>
                      <option value="Geologia">Geologia</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </>
              : <></>
            }

            {tipo == 'Ser' ?
              <>
                <h5>Dados do Servidor</h5>
                <hr className="mt-0" />

                <Row>
                  <Form.Group as={Col} className="mb-3" controlId="registro">
                    <Form.Label>Registro</Form.Label>
                    <Form.Control type="text" value={registro} onChange={(e) => setRegistro(e.target.value)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="departamento">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Select className="mb-3" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                      <option value="">Selecione o departamento</option>
                      <option value="IGCE">IGCE</option>
                      <option value="IB">IB</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </>
              : <></>
            }

            <div className="d-flex">
              <Button as={Link as any} to="/" variant="link" className="text-primary">← Voltar</Button>
              <Button variant="primary" type="submit" className="ms-auto text-white"><i className="bi bi-check me-2"></i>Cadastrar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer position="bottom-center"/>
    </Container>
  );
};

export default Cadastro;
