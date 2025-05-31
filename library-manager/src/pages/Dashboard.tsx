import { Button, Container } from "react-bootstrap";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Container className="mt-3">

        <Button as={Link as any} to="/" variant="primary" className="mb-4">
          ← Voltar para o catálogo 
        </Button>
        <h2>Dashboard</h2>
      </Container>
    </div>
  );
};

export default Dashboard;