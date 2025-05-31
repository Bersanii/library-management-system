import { useState } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import './Login.css';

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
    <Container fluid style={{height: '100vh'}} className="background d-flex">
      <Card className="mx-auto my-auto">
        <Card.Body className="p-5">
          <h2 className="mb-3">Login</h2>
          <p className="mb-3">Se ainda não tem uma conta, clique <Link to='/cadastro'>aqui</Link> para realizar seu cadastro.</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label>Cpf</Form.Label>
              <Form.Control type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </Form.Group>

            <div className="d-flex">
              <Button as={Link as any} to="/" variant="link">← Voltar</Button>
              <Button variant="primary" type="submit" className="ms-auto">Login</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default Login;