import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const DashboardAdm = () => {
  const [alunos, setAlunos] = useState([]);
  const [servidores, setServidores] = useState([]);

  async function loadData() {
    try {
      const response = await fetch(`${API_URL}/usuarios?tipo=Alu`);
      if (!response.ok) throw new Error("Erro ao buscar alunos");
      const data = await response.json();
      setAlunos(data);
    } catch (err) {
      console.error(err);
      toast.error('Erro buscar alunos.');
    }

    try {
      const response = await fetch(`${API_URL}/usuarios?tipo=Ser`);
      if (!response.ok) throw new Error("Erro ao buscar servidores");
      const data = await response.json();
      setServidores(data);
    } catch (err) {
      console.error(err);
      toast.error('Erro buscar servidores.');
    }
  }

  async function handleDeleteUsuario(cpf: string) {
    const confirm = window.confirm(`Deseja realmente excluir o usuário de CPF ${cpf}?`);
    if (!confirm) return;

    try {
      const response = await fetch(`${API_URL}/deleteUsuario/${cpf}`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error();

      toast.success('Usuário excluído com sucesso.');
      loadData(); // Atualiza a lista
    } catch (err) {
      console.error(err);
      toast.error('Erro ao excluir o usuário.');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container className="mt-3">

        <Button as={Link as any} to="/" variant="link" className="text-primary text-decoration-none p-0 mb-2">
          <i className="bi bi-arrow-left me-2" />Voltar para o catálogo
        </Button>
        <h2>Painel de controle</h2>
        <hr />

        <Row>
          <Col sm={12} lg={6}>
            <div className="d-flex align-items-center justify-content-between">
              <h4>Servidores</h4>
              <Button as={Link as any} to={{pathname: '/cadastro', search: '?tipo=Ser'}} variant="link" className="text-primary text-decoration-none p-0">
                <i className="bi bi-plus me-2" />Cadastrar um servidor
              </Button>
            </div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Cpf</th>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {servidores.map((servidor: any) => (
                  <tr key={servidor?.cpf}>
                    <td>{servidor?.cpf}</td>
                    <td>{servidor?.nome}</td>
                    <td style={{alignItems: 'end'}}>
                      <Button variant="link" className="text-primary text-decoration-none p-0" onClick={() => handleDeleteUsuario(servidor.cpf)}>
                        <i className="bi bi-x me-2" />Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm={12} lg={6}>
            <h4>Alunos</h4>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Cpf</th>
                  <th>Nome</th>
                  {/* <th>Ações</th> */}
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno: any) => (
                  <tr key={aluno?.cpf}>
                    <td>{aluno?.cpf}</td>
                    <td>{aluno?.nome}</td>
                    {/* <td style={{alignItems: 'end'}}>
                      <Button variant="link" className="text-primary text-decoration-none p-0" onClick={() => handleDeleteUsuario(aluno.cpf)}>
                        <i className="bi bi-x me-2" />Excluir
                      </Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default DashboardAdm;