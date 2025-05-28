import { useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const success = await login(cpf, senha);

    if (success){
      toast.success('Login efetuado.')
      navigate("/dashboard");
    } else {
      toast.error('Usuário/Senha inválidos.')
    }
  }

  return (
    <Container>
      <h1 className="mb-3">Efetue o login</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label>Cpf</Form.Label>
          <Form.Control type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Login;