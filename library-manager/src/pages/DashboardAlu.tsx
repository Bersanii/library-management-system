import { useEffect, useState } from "react";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import { format } from "date-fns";
import { useAuth } from "../context/auth";
import { toast, ToastContainer } from 'react-toastify';
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const DashboardAlu = () => {
  const { user } = useAuth();
  const [emprestimos, setEmprestimos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmprestimos = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/getEmprestimos?q=${user?.cpf}`);
      if (!response.ok) throw new Error("Erro ao buscar empréstimos");
      const data = await response.json();
      setEmprestimos(data);
    } catch (err: any) {
      console.error(err);
      toast.error("Não foi possível carregar os empréstimos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmprestimos();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h2>Meus Empréstimos</h2>
        <hr />

        <p>Visualize abaixo os status dos seus empréstimos atualizados.</p>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Código</th>
                <th>CPF</th>
                <th>Prazo Devolução</th>
                <th>Exemplares (Tombo)</th>
                <th>Devolvido?</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    Nenhum empréstimo encontrado.
                  </td>
                </tr>
              ) : (
                emprestimos.map((emp: any) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.cpf}</td>
                    <td>{format(new Date(emp.prazoDevolucao), "dd/MM/yyyy")}</td>
                    <td>{emp.Exemplars?.map((ex: any) => ex.tombo).join(", ")}</td>
                    <td>{emp.dataHoraDevolucao ? "Sim" : "Não"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
        <Button as={Link as any} to="/" className="background px-4 py-3 rounded-4 text-white w-100">Encontre novos livros. Clique aqui para acessar o catálogo.</Button>
      </Container>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default DashboardAlu;
