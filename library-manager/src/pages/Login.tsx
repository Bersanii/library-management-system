import { useState } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router";
import { Container, Form, Button, Card } from "react-bootstrap";
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
    <Container fluid style={{height: '100vh'}} className="background d-flex">
      <Card className="mx-auto my-auto rounded-4" style={{maxWidth: '30vw'}}>
        <Card.Body className="p-5">
          <h2 className="mb-3">Login</h2>
          <p className="mb-3">Se você é um aluno e ainda não tem uma conta, clique <Link to='/cadastro' className="text-primary">aqui</Link> para realizar seu cadastro.</p>
          
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
              <Button as={Link as any} to="/" variant="link" className="text-primary">← Voltar</Button>
              <Button variant="primary" type="submit" className="ms-auto text-white"><i className="bi bi-box-arrow-in-right me-2"></i>Login</Button>
            </div>
          </Form>

          <p className="text-secondary mt-3" style={{fontSize: '10pt'}}>Se você é um servidor, solicite suas credenciais ao administrador do sistema</p>

        </Card.Body>
      </Card>
      <ToastContainer position="bottom-center"/>
    </Container>
  );
};

export default Login;