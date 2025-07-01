import { Container, Form, Row, Col } from "react-bootstrap";
import { useAuth } from '../context/auth'

const Perfil = () => {
  const { user } = useAuth();

  return (
    <Container className="mt-3">
            <h2>Perfil</h2>
            <hr />

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control type="text" disabled value={user.cpf} />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" disabled value={user.nome}/>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="endereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" disabled value={user.endereco} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contato">
              <Form.Label>Contato</Form.Label>
              <Form.Control type="text" disabled value={user.contato} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" disabled value={user.senha}  />
            </Form.Group>
    </Container>
  );
};

export default Perfil;
