import { Link, Outlet, useNavigate } from "react-router";
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from "../context/auth";

const MainLayout = () => {
  const { isLogged, user, logout } = useAuth();
  const navigate = useNavigate();

  function logoutAction(){
    logout();
    navigate("/", { replace: true });
  }

  return (
    <>
      <Navbar className="bg-primary">
        <Container className="d-flex">
          <Navbar.Brand href="#home" className="text-light">
            Library Manager
          </Navbar.Brand>

          {isLogged ?
            <Nav>
              <NavDropdown className="text-white" title={user.nome}>
                {user.tipo == 'Adm' ? <NavDropdown.Item as={Link as any} to='/dashboard-adm'>Painel de controle</NavDropdown.Item> : <></>}
                {user.tipo == 'Alu' ? <NavDropdown.Item as={Link as any} to='/dashboard-alu'>Empréstimos</NavDropdown.Item> : <></>}
                {user.tipo == 'Ser' ? <NavDropdown.Item as={Link as any} to='/dashboard-ser'>Gerenciamento</NavDropdown.Item> : <></>}
                {user.tipo == 'Ser' ? <NavDropdown.Item as={Link as any} to='/emprestimo'>Empréstimo</NavDropdown.Item> : <></>}
                {user.tipo == 'Ser' ? <NavDropdown.Item as={Link as any} to='/devolucao'>Devolução</NavDropdown.Item> : <></>}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutAction}>Sair</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          : (
            <>
              <Button as={Link as any} to="/login" className="text-white ms-auto">Entrar</Button>
              <Button as={Link as any} to="/cadastro" className="text-white">Cadastre-se</Button>
            </>
          )}
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default MainLayout;