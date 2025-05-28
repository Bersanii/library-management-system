import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL

const Cadastro = () => {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [senha, setSenha] = useState("");
  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");

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
    };

    try{
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error();
      }

      // const data = await response.json();

      toast.success('Cadastro efetuado com sucesso.');
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao efetuar o cadastro.');
    }
  }

  return (
    <Container>
      <h1 className="mb-3">Efetue seu cadastro</h1>

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
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

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


        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Cadastro;
