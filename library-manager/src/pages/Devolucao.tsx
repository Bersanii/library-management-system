import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Spinner } from "react-bootstrap";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL;

const Devolucao = () => {
  const [cpfSearch, setCpfSearch] = useState("");
  const [emprestimos, setEmprestimos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<number | null>(null);

  const fetchEmprestimos = async (cpf: string) => {
    if (!cpf || cpf.length < 3) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/getEmprestimos?q=${cpf}`);
      if (!response.ok) throw new Error("Erro ao buscar empréstimos");
      const data = await response.json();
      setEmprestimos(data);
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível carregar os empréstimos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDevolver = async (emprestimoId: number, tombos: number[]) => {
    setProcessing(emprestimoId);
    try {
      const response = await fetch(`${API_URL}/devolverEmprestimo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emprestimoId, tombos }),
      });
      if (!response.ok) throw new Error("Erro na devolução");
      await fetchEmprestimos(cpfSearch); // refresh list
    } catch (err: any) {
      console.error(err);
      setError("Erro ao registrar devolução.");
    } finally {
      setProcessing(null);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchEmprestimos(cpfSearch);
    }, 400);
    return () => clearTimeout(delay);
  }, [cpfSearch]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Devolução de Empréstimos</h2>
      <Form.Control
        type="text"
        placeholder="Buscar por CPF..."
        value={cpfSearch}
        onChange={(e) => setCpfSearch(e.target.value)}
        className="mb-3"
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>CPF</th>
              <th>Prazo Devolução</th>
              <th>Exemplares</th>
              <th>Devolvido?</th>
              <th>Ação</th>
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
                  <td>
                    <Button
                      variant="primary"
                      className="text-white"
                      size="sm"
                      disabled={!!emp.dataHoraDevolucao || processing === emp.id}
                      onClick={() => handleDevolver(emp.id, emp.Exemplars.map((e: any) => e.tombo))}
                    >
                      {processing === emp.id ? "Processando..." : "Devolver"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Devolucao;
